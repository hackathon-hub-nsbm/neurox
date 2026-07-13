import Link from "next/link";

export default function ProjectSubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-geist-mono)" }}>
          Submissions Closed
        </h1>
        <p className="text-text-secondary text-lg">
          The project submission window for NeuroX 2026 has ended.
        </p>
      </div>

      <div className="p-8 rounded-lg border border-border bg-bg-card flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Submissions Locked
        </h3>
        <p className="text-sm text-text-secondary mb-6 max-w-md">
          We are no longer accepting project submissions. Thank you to all the teams who submitted their projects.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-bg-tertiary text-sm text-text-primary hover:border-accent-cyan hover:text-accent-cyan transition-all"
        >
          Browse Projects Gallery
        </Link>
      </div>
    </div>
  );
}
