"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4">
      <h2 className="font-semibold text-red-700">Algo deu errado</h2>
      <p className="mb-3 text-sm text-red-600">{error.message}</p>
      <button onClick={reset} className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700">Tentar de novo</button>
    </div>
  );
}
