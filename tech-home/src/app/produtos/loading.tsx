export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-3 p-6" aria-busy="true">
      <div className="h-8 w-2/3 rounded bg-slate-200" />
      <div className="h-6 w-32 rounded bg-slate-200" />
      <div className="h-24 rounded bg-slate-200" />
    </div>
  );
}
