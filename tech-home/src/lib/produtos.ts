import { isValidObjectId } from "mongoose";
import { connectDB } from "./mongodb";
import Produto from "@/models/Produto";
import type { ProdutoDTO } from "@/types";

type Lean = { _id: { toString(): string }; nome: string; descricao?: string; preco: number; estoque: number, imagem: string };

const toDTO = (p: Lean): ProdutoDTO => ({
  _id: p._id.toString(),
  nome: p.nome,
  descricao: p.descricao ?? "",
  preco: p.preco,
  estoque: p.estoque,
  imagem: p.imagem ?? "",
});

export async function getProdutos(): Promise<ProdutoDTO[]> {
  await connectDB();
  const lista = await Produto.find().sort({ createdAt: -1 }).lean();
  return lista.map(toDTO);
}

export async function getProduto(id: string): Promise<ProdutoDTO | null> {
  if (!isValidObjectId(id)) return null;
  await connectDB();
  const p = await Produto.findById(id).lean();
  return p ? toDTO(p) : null;
}
