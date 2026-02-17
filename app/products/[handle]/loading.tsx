export default function ProductLoading() {
  return (
    <div className="grid animate-pulse gap-6 md:grid-cols-2" aria-busy="true" aria-live="polite">
      <div className="aspect-square rounded-xl bg-zinc-200" />
      <div className="space-y-3">
        <div className="h-8 w-2/3 rounded bg-zinc-200" />
        <div className="h-4 w-full rounded bg-zinc-200" />
        <div className="h-4 w-5/6 rounded bg-zinc-200" />
        <div className="h-6 w-1/3 rounded bg-zinc-200" />
      </div>
    </div>
  );
}
