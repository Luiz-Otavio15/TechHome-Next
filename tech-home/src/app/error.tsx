"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const mensagem =
    error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>

          <h1 className="text-xl font-bold text-slate-900">Algo deu errado</h1>
          <p className="text-sm text-slate-500">{mensagem}</p>

          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button onClick={() => retry()} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>

            <Link
              href="/principal"
              className={buttonVariants({ variant: "outline", className: "flex-1" })}
            >
              <Home className="mr-2 h-4 w-4" />
              Ir para a loja
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
