import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Pedido from "@/models/Pedido";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default async function PedidosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  await dbConnect();
  const pedidos = await Pedido.find({ usuario: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Meus pedidos</h1>
          <Button variant="outline">
            <Link href="/principal">Voltar para a loja</Link>
          </Button>
        </div>

        {pedidos.length === 0 && (
          <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
        )}

        {pedidos.map((p) => (
          <Card key={p._id.toString()}>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-medium">{p.nomeProduto}</p>
                <p className="text-sm text-gray-500">
                  {p.quantidade}x · {p.endereco.cidade}/{p.endereco.uf} ·{" "}
                  {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{brl(p.total)}</p>
                <span className="text-xs capitalize text-gray-500">{p.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}