"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const f = new FormData(e.currentTarget);
    const res = await signIn("credentials", { email: f.get("email"), senha: f.get("senha"), redirect: false });
    setCarregando(false);
    if (res?.error) return setErro("E-mail ou senha incorretos");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="E-mail" required className="rounded-lg border border-slate-300 p-2" />
        <input name="senha" type="password" placeholder="Senha" required className="rounded-lg border border-slate-300 p-2" />
        {erro && <p role="alert" className="text-sm text-red-600">{erro}</p>}
        <button disabled={carregando} className="rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="text-sm text-slate-600">Não tem conta? <Link href="/cadastro" className="text-indigo-600 underline">Cadastre-se</Link></p>
    </main>
  );
}
