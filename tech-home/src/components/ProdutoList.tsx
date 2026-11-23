"use client";
import Link from "next/link";
import { useExcluirProduto, useProdutos } from "@/hooks/useProdutos";
import { useUIStore } from "@/store/ui-store";
import { formatarPreco } from "@/lib/format";
import { EstoqueBadge } from "./ProdutoCard";
import ProdutoModal from "./ProdutoModal";
import ProdutoImagem from "./ProdutoImagem";

export default function ProdutoList() {
  const { data, isLoading, error } = useProdutos();
  const excluir = useExcluirProduto();
  const busca = useUIStore((s) => s.busca);
  const setBusca = useUIStore((s) => s.setBusca);
  const abrirModal = useUIStore((s) => s.abrirModal);

  const lista = (data ?? []).filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar produto..." aria-label="Buscar produto" className="rounded-lg border border-slate-300 bg-white p-2" />
        <button onClick={() => abrirModal()} className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">Novo produto</button>
      </div>

      {isLoading && <p className="text-slate-500">Carregando...</p>}
      {error && <p role="alert" className="text-red-600">{error.message}</p>}
      {!isLoading && !error && lista.length === 0 && <p className="text-slate-500">Nenhum produto por aqui. Cadastre o primeiro.</p>}

      <ul className="grid gap-3 sm:grid-cols-2">
        {lista.map((p) => (
          <li key={p._id} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4">
            <ProdutoImagem src={p.imagem} alt={p.nome} />
            <Link href={`/produtos/${p._id}`} className="font-semibold hover:underline">{p.nome}</Link>
            <p className="line-clamp-2 text-sm text-slate-600">{p.descricao || "Sem descrição"}</p>
            <p className="font-bold">{formatarPreco(p.preco)}</p>
            <EstoqueBadge estoque={p.estoque} />
            <div className="mt-1 flex gap-2 text-sm">
              <button onClick={() => abrirModal(p)} className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-100">Editar</button>
              <button
                onClick={() => confirm("Excluir este produto?") && excluir.mutate(p._id)}
                disabled={excluir.isPending}
                className="rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ProdutoModal />
    </section>
  );
}
