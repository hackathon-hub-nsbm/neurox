export default function ProjectDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb skeleton */}
      <div className="h-5 w-32 bg-bg-tertiary rounded animate-pulse mb-6" />

      {/* Screenshot skeleton */}
      <div className="aspect-video rounded-xl bg-bg-tertiary animate-pulse mb-6" />

      {/* Title skeleton */}
      <div className="mb-10">
        <div className="h-8 w-2/3 bg-bg-tertiary rounded animate-pulse mb-2" />
        <div className="h-5 w-1/2 bg-bg-tertiary rounded animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-4 w-full bg-bg-tertiary rounded animate-pulse" />
          <div className="h-4 w-full bg-bg-tertiary rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-bg-tertiary rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-bg-tertiary rounded animate-pulse" />
        </div>
        <div>
          <div className="h-48 bg-bg-tertiary rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
