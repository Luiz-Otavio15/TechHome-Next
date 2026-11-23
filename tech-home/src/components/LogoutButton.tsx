"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100">
      Sair
    </button>
  );
}
