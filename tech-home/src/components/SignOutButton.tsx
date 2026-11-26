"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";


export default function SignOutButton() {
  return (
    <button className="" onClick={() => signOut({ callbackUrl: "/login" })}>
      <LogOut size={16} />
      Sair da conta
    </button>
  );
}