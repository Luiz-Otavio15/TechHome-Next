import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ArrowLeft, ShoppingBag, MapPin, CalendarDays } from "lucide-react";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Pedido from "@/models/Pedido";
import Logout from "@/components/logoutbutton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  const pedidos = await Pedido.find({ usuario: session.user.id })
  .sort({ createdAt: -1 })
  .lean();

  const totalGeral = pedidos.reduce((soma, p) => soma + (p.total ?? 0), 0);

  return (
    <main className="min-h-screen bg-slate-100 bg-[radial-gradient(900px_340px_at_50%_-80px,#e0e9ff,transparent_70%)] px-5 pb-20 pt-7 text-slate-900 sm:pt-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-sm text-slate-500">Minha conta</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
              Olá, {session.user?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/principal">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Voltar para a loja
              </Button>
            </Link>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-3">
          <Card className="rounded-2xl">
            <CardContent className="!p-5">
              <p className="text-xs font-semibold text-slate-500">Pedidos realizados</p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight">{pedidos.length}</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="!p-5">
              <p className="text-xs font-semibold text-slate-500">Total gasto</p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight">{brl(totalGeral)}</p>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Seus pedidos" className="flex flex-col gap-3">
          <div className="mb-1 flex items-center gap-2.5">
            <h2 className="text-lg font-bold">Seus pedidos</h2>
            <span className="min-w-[26px] rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs font-bold text-blue-700">
              {pedidos.length}
            </span>
          </div>

          {pedidos.length === 0 ? (
            <Card className="rounded-2xl border-dashed border-slate-300">
              <CardContent className="grid justify-items-center gap-1.5 !p-14 text-center text-slate-500">
                <ShoppingBag size={36} />
                <p className="mt-2 font-semibold text-slate-900">Você ainda não fez nenhum pedido.</p>
                <Link href="/" className="font-semibold text-blue-700 underline-offset-2 hover:underline">
                  Ver produtos da loja
                </Link>
              </CardContent>
            </Card>
          ) : (
            pedidos.map((p) => (
              <Card
                key={p._id.toString()}
                className="rounded-2xl transition hover:border-slate-300 hover:shadow-[0_8px_24px_-14px_rgba(15,23,42,0.25)]"
              >
                <CardContent className="flex flex-wrap items-center gap-4 !p-5 sm:flex-nowrap">
                  <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-xl bg-blue-100 text-blue-700">
                    <ShoppingBag size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[1.05rem] font-bold">{p.nomeProduto}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-sm text-slate-500">
                      <span className="font-semibold text-slate-700">{p.quantidade}x</span>
                      {p.endereco?.cidade && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={13} />
                          {p.endereco.cidade}
                          {p.endereco.uf && `/${p.endereco.uf}`}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={13} />
                        {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </p>
                  </div>
                  <strong className="flex-none text-[1.05rem] font-extrabold tracking-tight">
                    {brl(p.total)}
                  </strong>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      </div>
    </main>
  );
}