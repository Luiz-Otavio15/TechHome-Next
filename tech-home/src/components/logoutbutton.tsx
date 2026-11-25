'use client'
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ESC fecha o aviso e o scroll da página fica travado enquanto ele estiver aberto
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, loading]);

  async function handleSignOut() {
    setLoading(true);
    await signOut({ callbackUrl: "/login" }); // troque por "/saiu" se criar a página
  }

  return (
    <>
      <Button
        variant="ghost"
        className="w-full text-red-600 hover:text-red-700 border border-gray-400"
        onClick={() => setOpen(true)}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sair da conta
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signout-title"
            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>

            <h2 id="signout-title" className="text-lg font-semibold">
              Deseja sair da conta?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Você precisará fazer login novamente para acessar a loja.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleSignOut}
                disabled={loading}
              >
                {loading ? "Saindo..." : "Sair"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}