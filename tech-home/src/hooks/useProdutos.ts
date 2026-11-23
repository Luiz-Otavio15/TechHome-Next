"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProdutoDTO, ProdutoInput } from "@/types";

const KEY = ["produtos"];

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error ?? "Erro na requisição");
  }
  return res.json();
}

export const useProdutos = () => useQuery({ queryKey: KEY, queryFn: () => api<ProdutoDTO[]>("/api/produtos") });

function useInvalidar<TVars>(fn: (v: TVars) => Promise<unknown>) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: fn, onSuccess: () => qc.invalidateQueries({ queryKey: KEY }) });
}

export const useCriarProduto = () =>
  useInvalidar((d: ProdutoInput) => api("/api/produtos", { method: "POST", body: JSON.stringify(d) }));

export const useAtualizarProduto = () =>
  useInvalidar(({ id, ...d }: ProdutoInput & { id: string }) =>
    api(`/api/produtos/${id}`, { method: "PUT", body: JSON.stringify(d) })
  );

export const useExcluirProduto = () =>
  useInvalidar((id: string) => api(`/api/produtos/${id}`, { method: "DELETE" }));
