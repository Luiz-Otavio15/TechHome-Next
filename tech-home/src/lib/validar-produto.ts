import type { ProdutoInput } from "@/types";

export function validarProduto(body: unknown): { dados?: ProdutoInput; erro?: string } {
  const { nome, descricao, preco, estoque, imagem } = (body ?? {}) as Record<string, unknown>;
  const p = Number(preco);
  const e = Number(estoque);
  if (typeof nome !== "string" || !nome.trim()) return { erro: "Informe o nome do produto" };
  if (!Number.isFinite(p) || p < 0) return { erro: "Preço inválido" };
  if (!Number.isInteger(e) || e < 0) return { erro: "O estoque deve ser um número inteiro (0 ou mais)" };
  
  const url = typeof imagem === "string" ? imagem.trim() : "";
  if (url && !/^https?:\/\//i.test(url)) return { erro: "A imagem deve ser um link http(s)" };
  // e no objeto retornado, junto dos outros campos:
  // imagem: url
  
  return {
    dados: { nome: nome.trim(), descricao: typeof descricao === "string" ? descricao.trim() : "", preco: p, estoque: e, imagem: url, },
  };
}
