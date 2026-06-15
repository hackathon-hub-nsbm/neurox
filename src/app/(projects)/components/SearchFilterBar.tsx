"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";

interface SearchFilterBarProps {
  tracks: string[];
  technologies: string[];
}

export default function SearchFilterBar({ tracks, technologies }: SearchFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentTech = searchParams.get("tech") ?? "";
  const currentTrack = searchParams.get("track") ?? "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="mb-8 space-y-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          defaultValue={currentSearch}
          placeholder="Search projects..."
          onChange={(e) => updateParams("search", e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg-card text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="animate-spin w-4 h-4 text-text-dim" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Track filter */}
        <select
          value={currentTrack}
          onChange={(e) => updateParams("track", e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-bg-card text-sm text-text-secondary focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none transition-all"
        >
          <option value="">All Tracks</option>
          {tracks.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>

        {/* Tech filter */}
        <select
          value={currentTech}
          onChange={(e) => updateParams("tech", e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-bg-card text-sm text-text-secondary focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none transition-all"
        >
          <option value="">All Technologies</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {(currentSearch || currentTech || currentTrack) && (
          <button
            type="button"
            onClick={() => router.replace(pathname)}
            className="px-3 py-2 text-xs text-text-dim hover:text-text-secondary transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
