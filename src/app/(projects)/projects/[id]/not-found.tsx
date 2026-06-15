import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center">
        <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Project Not Found
      </h1>
      <p className="text-text-secondary mb-6">
        The project you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/projects"
        className="inline-flex px-6 py-2.5 rounded-lg bg-accent-cyan text-white font-semibold text-sm transition-all hover:opacity-90"
      >
        Back to Gallery
      </Link>
    </div>
  );
}
