import ProdutoList from "@/components/ProdutoList";

// Server Component: só a lista (folha da árvore) é Client Component.
export default function DashboardPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Meus produtos</h1>
      <ProdutoList />
    </>
  );
}
