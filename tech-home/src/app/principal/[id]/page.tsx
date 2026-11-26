import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar, NavbarVoltar } from "@/components/ui/navbar";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default async function ProdutoPage({params,}: {params: Promise<{ id: string }>;}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await dbConnect();
  const produto = await Product.findById(id).lean();
  if (!produto) notFound();

  const semEstoque = produto.estoque <= 0;
  const estoqueBaixo = produto.estoque > 0 && produto.estoque <= 5;

  return (  
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavbarVoltar/>
      <div className="mx-auto max-w-5xl p-10">
        
        

        <Card>
          <CardContent className="grid gap-8 p-6 md:grid-cols-2">
            {/* Imagem */}
            <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
              {produto.imagem && (
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              )}
            </div>

            {/* Informações */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">{produto.nome}</h1>

              <p className="text-4xl font-medium">{brl(produto.preco)}</p>

              {/* Estoque */}
              {semEstoque ? (
                <span className="w-fit rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                  Produto esgotado
                </span>
              ) : (
                <span
                  className={`w-fit rounded px-2 py-1 text-sm font-medium ${
                    estoqueBaixo
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {estoqueBaixo
                    ? `Últimas ${produto.estoque} unidades`
                    : `${produto.estoque} unidades em estoque`}
                </span>
              )}

              {/* Descrição */}
              <div>
                <h2 className="mb-1 text-sm font-semibold text-gray-500">
                  Descrição
                </h2>
                <p className="whitespace-pre-line text-gray-700">
                  {produto.descricao}
                </p>
              </div>

              {/* Comprar */}
              {semEstoque ? (
                <Button disabled className="mt-auto w-full">
                  Indisponível
                </Button>
              ) : (
                <Button size="lg" className="mt-auto w-full bg-green-600 hover:bg-green-700">
                  <Link href={`/principal/${produto._id}/finalizacao`} className="flex">
                    <ShoppingCart className="mr-2"/>
                    Comprar agora
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}