'use server'

import dbConnect from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import Pedido from "@/models/Pedido";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isValidObjectId } from "mongoose";
import { error } from "node:console";

// --- AÇÃO DE REGISTRO ---
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "Preencha tudo!" };

  await dbConnect();

  // Verifica se já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "Email já cadastrado" };

  // Cria hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });
  return { success: true };
}


// --- AÇÃO DE CRIAR PRODUTO ---
export async function addProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não autorizado" };

  const nome = formData.get("nome");
  const preco = formData.get("preco");
  const imagem = formData.get("imagem")
  const descricao = formData.get("descricao")
  const estoque = formData.get("estoque")
  await dbConnect();
  await Product.create({
    nome,
    descricao,
    preco: Number(preco),
    imagem,
    estoque: Number(estoque),
    usuarioId: (session.user as any).id
  });

  

  revalidatePath("/dashboard"); // Atualiza a lista instantaneamente
  return { success: true };
}

// --- AÇÃO DE DELETAR PRODUTO ---
export async function deleteProduct(formData: FormData) {
  const id = formData.get("id");
  await dbConnect();
  await Product.findByIdAndDelete(id);
  revalidatePath("/dashboard");
}

// --- AÇÃO DE ATUALIZAR PRODUTO ---
export async function updateProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não autorizado" };

  const id = formData.get("id");
  const nome = formData.get("nome");
  const preco = formData.get("preco");

  await dbConnect();
  await Product.findByIdAndUpdate(id, { nome, preco: Number(preco) });

  revalidatePath("/dashboard");
  return { success: true };
}

// --- AÇÃO DE CRIAR PEDIDO ---
export async function criarPedido(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { error: "Não autorizado" };

  // helper: pega o campo como texto, sem espaços nas pontas
  const campo = (nome: string) => String(formData.get(nome) ?? "").trim();

  const produtoId = campo("produtoId");
  const quantidade = Number(campo("quantidade"));
  const endereco = {
    cep: campo("cep").replace(/\D/g, ""), // aceita 58000-000 ou 58000000
    rua: campo("rua"),
    numero: campo("numero"),
    complemento: campo("complemento"),
    bairro: campo("bairro"),
    cidade: campo("cidade"),
    uf: campo("uf").toUpperCase(),
  };

  // Validação
  if (!isValidObjectId(produtoId)) return { error: "Produto inválido" };
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return { error: "Quantidade inválida" };
  }
  if (endereco.cep.length !== 8) return { error: "CEP inválido" };
  if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || endereco.uf.length !== 2) {
    return { error: "Preencha o endereço completo" };
  }

  await dbConnect();

  // Desconta o estoque só se ainda houver quantidade (atômico)
  const produto = await Product.findOneAndUpdate(
    { _id: produtoId, estoque: { $gte: quantidade } },
    { $inc: { estoque: -quantidade } },
    { new: true }
  ).lean();

  if (!produto) return { error: "Estoque insuficiente" };

  try {
    const pedido = await Pedido.create({
      usuario: userId,
      produto: produto._id,
      nomeProduto: produto.nome,
      precoUnitario: produto.preco,
      quantidade,
      total: produto.preco * quantidade,
      endereco,
    });

    revalidatePath("/principal");
    revalidatePath("/pedidos");

    return { success: true, pedidoId: pedido._id.toString() };
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    await Product.updateOne({ _id: produtoId }, { $inc: { estoque: quantidade } });
    return { error: "Não foi possível criar o pedido" };
  }
}

export async function promoverUsuario(id: string) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    throw new Error("Sem permissão!");
  }
  await dbConnect();
  const usuario = await User.findByIdAndUpdate(
    id,
    { role: "gerente" },
    { new: true }
  );

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return { ok: true };
}

