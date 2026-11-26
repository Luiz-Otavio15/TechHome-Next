import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <SearchX className="h-7 w-7 text-blue-700" />
          </div>

          <h1 className="text-xl font-bold text-slate-900">Página não encontrada</h1>
          <p className="text-sm text-slate-500">
            O endereço que você tentou acessar não existe ou foi removido.
          </p>

          <Link href="/principal" className={buttonVariants({ className: "w-full" })}>
            <Home className="mr-2 h-4 w-4" />
            Voltar para a loja
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
