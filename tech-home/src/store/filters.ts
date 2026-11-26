import { create } from "zustand";

export type SortOption = "recent" | "price-asc" | "price-desc" | "name-asc";

interface FiltersState {
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  sortBy: "recent",
  setSortBy: (sortBy) => set({ sortBy }),
}));
