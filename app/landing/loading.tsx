export default function LandingLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="h-[420px] animate-pulse rounded-2xl bg-zinc-200" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-lg bg-zinc-200" />
        ))}
      </div>
    </div>
  );
}
