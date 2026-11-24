'use client'
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";


export default function SignOutButton() {
  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2"
    >
      
      Sair
    </Button>
  );
}