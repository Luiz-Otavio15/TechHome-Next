import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { validarProduto } from "@/lib/validar-produto";
import Produto from "@/models/Produto";

// Lista os produtos do usuário logado (usado pelo painel).
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  await connectDB();
  const lista = await Produto.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(lista);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { dados, erro } = validarProduto(await req.json().catch(() => null));
  if (erro) return NextResponse.json({ error: erro }, { status: 400 });
  await connectDB();
  const produto = await Produto.create({ ...dados, userId: session.user.id });
  revalidatePath("/"); // atualiza a vitrine pública
  return NextResponse.json(produto, { status: 201 });
}
