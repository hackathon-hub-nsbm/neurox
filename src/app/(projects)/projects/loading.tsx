export default function ProjectsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-8 w-48 bg-bg-tertiary rounded-md animate-pulse mb-2" />
        <div className="h-5 w-32 bg-bg-tertiary rounded-md animate-pulse" />
      </div>

      {/* Search skeleton */}
      <div className="mb-8">
        <div className="h-11 w-full bg-bg-tertiary rounded-lg animate-pulse" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-bg-card overflow-hidden">
            <div className="aspect-video bg-bg-tertiary animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-6 w-3/4 bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 w-full bg-bg-tertiary rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-bg-tertiary rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-bg-tertiary rounded-full animate-pulse" />
                <div className="h-5 w-20 bg-bg-tertiary rounded-full animate-pulse" />
                <div className="h-5 w-14 bg-bg-tertiary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
