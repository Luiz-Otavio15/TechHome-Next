import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

// Camada 2 de proteção (back): toda rota confere a sessão e filtra pelo userId.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  await connectDB();
  const itens = await Item.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(itens);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { titulo, descricao, status } = await req.json().catch(() => ({}));
  if (!titulo?.trim()) return NextResponse.json({ error: "Informe um título" }, { status: 400 });
  await connectDB();
  const item = await Item.create({ titulo, descricao, status, usuarioId: session.user.id });
  return NextResponse.json(item, { status: 201 });
}
