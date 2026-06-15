"use client";

import { useEffect } from "react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects error:", error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Something went wrong
      </h1>
      <p className="text-text-secondary mb-6">
        An error occurred while loading projects. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-6 py-2.5 rounded-lg bg-accent-cyan text-white font-semibold text-sm transition-all hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
}
