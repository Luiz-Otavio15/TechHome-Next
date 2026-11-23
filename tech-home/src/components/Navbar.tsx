"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

// Client Component para a vitrine continuar estática/cacheada (a sessão é lida no navegador).
export default function Navbar() {
  const { data: session, status } = useSession();
  const link = "rounded-lg px-3 py-1 text-sm hover:bg-slate-100";
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="" width={28} height={28} />
          {/* TODO: nome da sua loja */}
          Minha Loja
        </Link>
        <nav className="flex items-center gap-2">
          {status === "loading" ? null : session ? (
            <>
              <Link href="/dashboard" className={link}>Meus produtos</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={link}>Entrar</Link>
              <Link href="/cadastro" className="rounded-lg bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700">Criar conta</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
