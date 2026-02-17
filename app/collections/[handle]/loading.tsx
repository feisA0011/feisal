export default function CollectionLoading() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <div className="h-8 w-1/2 animate-pulse rounded bg-zinc-200" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-lg border border-zinc-200 p-4">
            <div className="h-40 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
