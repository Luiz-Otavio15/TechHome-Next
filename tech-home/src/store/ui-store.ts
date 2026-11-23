import { create } from "zustand";
import type { ProdutoDTO } from "@/types";

// Zustand só para estado de UI (modal e busca). Os dados do banco ficam no React Query.
interface UIState {
  modalAberto: boolean;
  produtoEditando: ProdutoDTO | null;
  busca: string;
  abrirModal: (produto?: ProdutoDTO) => void;
  fecharModal: () => void;
  setBusca: (b: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  modalAberto: false,
  produtoEditando: null,
  busca: "",
  abrirModal: (produto) => set({ modalAberto: true, produtoEditando: produto ?? null }),
  fecharModal: () => set({ modalAberto: false, produtoEditando: null }),
  setBusca: (busca) => set({ busca }),
}));
