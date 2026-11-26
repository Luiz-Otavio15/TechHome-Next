import { notFound, redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import CheckoutForm from "@/components/checkoutForm";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await dbConnect();
  const produto = await Product.findById(id).lean();
  if (!produto || produto.estoque <= 0) notFound();

  return (
    <CheckoutForm
      produto={{
        id,
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.estoque,
      }}
    />
  );
}