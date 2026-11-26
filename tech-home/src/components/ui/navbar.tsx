"use client";

import { ArrowLeft, Handbag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./button";

function voltarHref(pathname: string) {
  const partes = pathname.split("/").filter(Boolean);
  // /principal/[id]/finalizacao -> /principal/[id]
  if (partes[0] === "principal" && partes.length >= 3) {
    return `/${partes.slice(0, 2).join("/")}`;
  }
  return "/principal";
}

export function Navbar() {
  const pathname = usePathname();
  const mostrarVoltar = pathname !== "/principal";

  return (
    <header className="bg-blue-500 px-4 py-3 sm:px-7 sm:py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <Link href="/principal" className="text-2xl font-bold text-white sm:text-3xl">
          TechHome
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-2">
          {mostrarVoltar && (
            <Link
              href={voltarHref(pathname)}
              className={buttonVariants({ className: "mr-0 sm:mr-2" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          )}

          <Link href="/pedidos" className={buttonVariants({ className: "mr-0 sm:mr-2" })}>
            <Handbag className="mr-2 h-4 w-4" />
            Pedidos
          </Link>

          <Link href="/perfil" className={buttonVariants()}>
            <User className="mr-2 h-4 w-4" />
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}
