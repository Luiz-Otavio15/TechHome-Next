import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { validarProduto } from "@/lib/validar-produto";
import Produto from "@/models/Produto";

type Ctx = { params: Promise<{ id: string }> };

async function autorizar(ctx: Ctx) {
  const session = await getServerSession(authOptions);
  const { id } = await ctx.params;
  if (!session) return { erro: NextResponse.json({ error: "Não autorizado" }, { status: 401 }) };
  if (!isValidObjectId(id)) return { erro: NextResponse.json({ error: "ID inválido" }, { status: 400 }) };
  return { id, userId: session.user.id };
}

function atualizarVitrine(id: string) {
  revalidatePath("/");
  revalidatePath(`/produtos/${id}`);
}

export async function PUT(req: Request, ctx: Ctx) {
  const a = await autorizar(ctx);
  if (a.erro) return a.erro;
  const { dados, erro } = validarProduto(await req.json().catch(() => null));
  if (erro) return NextResponse.json({ error: erro }, { status: 400 });
  await connectDB();
  const produto = await Produto.findOneAndUpdate({ _id: a.id, userId: a.userId }, dados, { new: true, runValidators: true });
  if (!produto) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  atualizarVitrine(a.id);
  return NextResponse.json(produto);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const a = await autorizar(ctx);
  if (a.erro) return a.erro;
  await connectDB();
  const produto = await Produto.findOneAndDelete({ _id: a.id, userId: a.userId });
  if (!produto) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  atualizarVitrine(a.id);
  return NextResponse.json({ ok: true });
}
