import Link from "next/link";
import { notFound } from "next/navigation";
import { EstoqueBadge } from "@/components/ProdutoCard";
import { formatarPreco } from "@/lib/format";
import { getProduto } from "@/lib/produtos";
export const revalidate = 60;

// Rota dinâmica pública: /produtos/<id>
export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produto = await getProduto(id);
  if (!produto) notFound();

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-3 p-4 sm:p-6">
      <Link href="/" className="text-sm text-indigo-600 underline">← Voltar para a loja</Link>
      <h1 className="text-3xl font-bold">{produto.nome}</h1>
      <p className="text-2xl font-bold">{formatarPreco(produto.preco)}</p>
      <EstoqueBadge estoque={produto.estoque} />
      <p className="whitespace-pre-wrap text-slate-700">{produto.descricao || "Sem descrição"}</p>
      <p>{}</p>
    </main>
  );
}
