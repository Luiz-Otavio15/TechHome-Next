import ProdutoCard from "@/components/ProdutoCard";
import { getProdutos } from "@/lib/produtos";

// Página pública: renderizada no servidor e cacheada. Atualiza a cada 60s
// ou na hora, quando o painel chama revalidatePath("/").
export const revalidate = 60;

export default async function Home() {
  const produtos = await getProdutos();
  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <h1 className="mb-1 text-3xl font-bold">Nossos produtos</h1>
      {/* TODO: frase de apresentação da loja */}
      <p className="mb-6 text-slate-600">Confira o que temos disponível.</p>
      {produtos.length === 0 ? (
        <p className="text-slate-500">Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p) => <ProdutoCard key={p._id} produto={p} />)}
        </ul>
      )}
    </main>
  );
}
