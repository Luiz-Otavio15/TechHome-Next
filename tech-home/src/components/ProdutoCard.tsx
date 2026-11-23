import Link from "next/link";
import { formatarPreco } from "@/lib/format";
import type { ProdutoDTO } from "@/types";
import Image from "next/image";
export function EstoqueBadge({ estoque }: { estoque: number }) {
  const esgotado = estoque === 0;
  return (
    <span className={`w-fit rounded-full px-2 py-0.5 text-xs ${esgotado ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
      {esgotado ? "Esgotado" : `${estoque} em estoque`}
    </span>
  );
}

export default function ProdutoCard({ produto }: { produto: ProdutoDTO }) {
  return (
    <li>
      <Link href={`/produtos/${produto._id}`} className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300">
        <h2 className="font-semibold">{produto.nome}</h2>
        <p className="line-clamp-2 text-sm text-slate-600">{produto.descricao || "Sem descrição"}</p>
        <p className="mt-auto text-lg font-bold">{formatarPreco(produto.preco)}</p>
        <EstoqueBadge estoque={produto.estoque} />
          {produto.imagem && (
            <Image src={produto.imagem} alt={produto.nome}></Image>
          )}
      </Link>
    </li>
  );
}
