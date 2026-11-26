"use client";

import ProdutoCard from "@/components/ProdutoCard";
import { useFilters, type SortOption } from "@/store/filters";

export interface ProdutoGridItem {
  _id: string;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

export default function ProductGrid({ produtos }: { produtos: ProdutoGridItem[] }) {
  const sortBy = useFilters((state) => state.sortBy);
  const setSortBy = useFilters((state) => state.setSortBy);

  const ordenados = [...produtos].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.preco - b.preco;
      case "price-desc":
        return b.preco - a.preco;
      case "name-asc":
        return a.nome.localeCompare(b.nome, "pt-BR");
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="mb-5 flex justify-end">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Ordenar por
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="name-asc">Nome (A-Z)</option>
          </select>
        </label>
      </div>

      <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordenados.map((produto) => (
          <ProdutoCard key={produto._id} product={produto} />
        ))}
      </div>
    </>
  );
}
