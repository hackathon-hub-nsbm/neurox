"use client";

import { useState, useEffect, useCallback } from "react";
import { toggleVote } from "@/app/actions/votes";

function getVoterId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("nx-voter-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("nx-voter-id", id);
  }
  return id;
}

function hasVoted(projectId: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`nx-voted-${projectId}`) === "true";
}

function setHasVoted(projectId: string, voted: boolean) {
  if (voted) {
    localStorage.setItem(`nx-voted-${projectId}`, "true");
  } else {
    localStorage.removeItem(`nx-voted-${projectId}`);
  }
}

export default function VoteButton({
  projectId,
  initialCount,
}: {
  projectId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVoted(hasVoted(projectId));
    setMounted(true);
  }, [projectId]);

  const handleVote = useCallback(async () => {
    if (pending) return;
    setPending(true);

    const voterId = getVoterId();
    const result = await toggleVote(projectId, voterId);

    if (result.success) {
      setCount(result.newCount);
      setVoted(result.didVote);
      setHasVoted(projectId, result.didVote);
    }

    setPending(false);
  }, [projectId, pending]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-bg-card">
        <svg className="w-5 h-5 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <span className="text-lg font-semibold text-text-primary">{initialCount}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleVote}
      disabled={pending}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all active:scale-[0.98] active:translate-y-px ${
        voted
          ? "border-accent-cyan/30 bg-accent-cyan-dim text-accent-cyan"
          : "border-border bg-bg-card text-text-dim hover:text-accent-cyan hover:border-accent-cyan/30"
      }`}
    >
      <svg
        className={`w-5 h-5 transition-transform ${pending ? "animate-bounce" : ""}`}
        fill={voted ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      <span className="text-lg font-semibold">{count}</span>
    </button>
  );
}
