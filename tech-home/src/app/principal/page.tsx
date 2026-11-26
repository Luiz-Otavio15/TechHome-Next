import Product from "@/models/Product";
import ProductGrid from "@/components/ProductGrid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import SearchInput from "@/components/ui/searchInput";
import { Suspense } from "react";
import { SearchX } from "lucide-react";

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default async function Principal({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { q } = await searchParams;
  const termo = q?.trim() ?? "";

  await dbConnect();

  const filtro = termo
    ? {
        $or: [
          { nome: { $regex: escapar(termo), $options: "i" } },
          { descricao: { $regex: escapar(termo), $options: "i" } },
        ],
      }
    : {};

  const produtos = await Product.find(filtro).sort({ createdAt: -1 }).lean();
  const lista = produtos.map((p) => ({
    _id: p._id.toString(),
    nome: p.nome,
    preco: p.preco,
    imagem: p.imagem,
    descricao: p.descricao ?? "",
  }));

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Produtos</h1>
          <p className="mt-1 text-sm text-slate-500">
            {termo
              ? `${lista.length} resultado(s) para "${termo}"`
              : `${lista.length} produto(s) disponíveis`}
          </p>
        </div>
        {/* Suspense é exigido por quem usa useSearchParams */}
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </div>

      {lista.length === 0 ? (
        <div className="grid justify-items-center gap-1.5 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-slate-500">
          <SearchX size={36} />
          <p className="mt-2 font-semibold text-slate-900">
            {termo ? "Nenhum produto encontrado." : "Nenhum produto cadastrado."}
          </p>
          {termo && <small>Tente buscar por outro nome.</small>}
        </div>
      ) : (
        <ProductGrid produtos={lista} />
      )}
    </main>
  );
}
