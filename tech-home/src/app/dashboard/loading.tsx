export default function Loading() {
  return (
    <div className="animate-pulse space-y-3" aria-busy="true">
      <div className="h-8 w-40 rounded bg-slate-200" />
      <div className="grid gap-3 sm:grid-cols-2">
        {[1, 2, 3, 4].map((n) => <div key={n} className="h-28 rounded-xl bg-slate-200" />)}
      </div>
    </div>
  );
}
