"use client";
import { useState } from "react";
import { useUIStore } from "@/store/ui-store";
import { useAtualizarProduto, useCriarProduto } from "@/hooks/useProdutos";
import type { ProdutoDTO } from "@/types";

function Form({ produto }: { produto: ProdutoDTO | null }) {
  const fechar = useUIStore((s) => s.fecharModal);
  const criar = useCriarProduto();
  const atualizar = useAtualizarProduto();
  const [nome, setNome] = useState(produto?.nome ?? "");
  const [descricao, setDescricao] = useState(produto?.descricao ?? "");
  const [preco, setPreco] = useState(produto ? String(produto.preco) : "");
  const [estoque, setEstoque] = useState(produto ? String(produto.estoque) : "0");
  const [imagem, setImagem] = useState(produto?.imagem ?? "");
  const m = produto ? atualizar : criar;
  const campo = "rounded-lg border border-slate-300 p-2";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dados = { nome, descricao, preco: Number(preco), estoque: Number(estoque), imagem };
    if (produto) atualizar.mutate({ id: produto._id, ...dados }, { onSuccess: fechar });
    else criar.mutate(dados, { onSuccess: fechar });
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 rounded-xl bg-white p-5 shadow-lg">
        <h2 className="text-lg font-semibold">{produto ? "Editar produto" : "Novo produto"}</h2>
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required className={campo} />
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" rows={3} className={campo} />
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">Preço (R$)
            <input type="number" min="0" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required className={campo} />
          </label>
          <label className="flex flex-col gap-1 text-sm">Estoque
            <input type="number" min="0" step="1" value={estoque} onChange={(e) => setEstoque(e.target.value)} required className={campo} />
          </label>
          <label className="flex flex-col gap-1 text-sm">imagem
            <input type="url" value={imagem} onChange={(e) => setImagem(e.target.value)} required className={campo} />
          </label>
        </div>
        {m.error && <p role="alert" className="text-sm text-red-600">{m.error.message}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={fechar} className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">Cancelar</button>
          <button disabled={m.isPending} className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
            {m.isPending ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProdutoModal() {
  const aberto = useUIStore((s) => s.modalAberto);
  const produto = useUIStore((s) => s.produtoEditando);
  if (!aberto) return null;
  return <Form key={produto?._id ?? "novo"} produto={produto} />;
}
