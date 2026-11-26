
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import ProductItem from "@/components/ProductItem";
import AddProductForm from "@/components/AddProductForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  
  // O .lean() converte os documentos do Mongoose em objetos JS puros
  const produto = await Product.find({ usuarioId: (session.user as any).id }).lean();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Olá, {session.user?.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/principal">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Voltar para a loja
              </Button>
            </Link>
          </div>
        </div>

        <AddProductForm />
        <div className="mb-1 flex items-center gap-2.5">
            <h2 className="text-lg font-bold">Seus produtos</h2>
            <span className="min-w-[26px] rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs font-bold text-blue-700">
              {produto.length}
            </span>
        </div>
        <div className="grid gap-4">
          {produto.map((product) => (
            <ProductItem 
              key={product._id.toString()} 
              product={{
                ...product,
                _id: product._id.toString()
              }} 
            />
          ))}
          
          {produto.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-20 pt-20">
                
                <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}