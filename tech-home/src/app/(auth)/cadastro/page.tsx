"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const dados = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    setCarregando(false);
    if (!res.ok) return setErro((await res.json().catch(() => ({}))).error ?? "Erro ao cadastrar");
    router.push("/login");
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Criar conta</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input name="nome" placeholder="Nome" required className="rounded-lg border border-slate-300 p-2" />
        <input name="email" type="email" placeholder="E-mail" required className="rounded-lg border border-slate-300 p-2" />
        <input name="senha" type="password" placeholder="Senha (mín. 6 caracteres)" minLength={6} required className="rounded-lg border border-slate-300 p-2" />
        {erro && <p role="alert" className="text-sm text-red-600">{erro}</p>}
        <button disabled={carregando} className="rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {carregando ? "Criando..." : "Criar conta"}
        </button>
      </form>
      <p className="text-sm text-slate-600">Já tem conta? <Link href="/login" className="text-indigo-600 underline">Entrar</Link></p>
    </main>
  );
}
