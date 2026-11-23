import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { nome, email, senha } = await req.json().catch(() => ({}));
  if (!nome?.trim() || !email?.trim() || !senha || senha.length < 6) {
    return NextResponse.json({ error: "Preencha nome, e-mail e uma senha de 6+ caracteres" }, { status: 400 });
  }
  await connectDB();
  if (await User.exists({ email: email.toLowerCase() })) {
    return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
  }
  const hash = await bcrypt.hash(senha, 10);
  await User.create({ nome, email, senha: hash });
  return NextResponse.json({ ok: true }, { status: 201 });
}
