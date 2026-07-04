"use client";

import { useState } from "react";
import { addComment, type CommentData } from "@/app/actions/comments";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommentSection({
  projectId,
  initialComments,
}: {
  projectId: string;
  initialComments: CommentData[];
}) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await addComment(projectId, authorName, body);
    setSubmitting(false);

    if (result.success && result.comment) {
      setComments((prev) => [...prev, result.comment!]);
      setAuthorName("");
      setBody("");
    } else {
      setError(result.message);
    }
  };

  return (
    <section id="comments">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Comments ({comments.length})
      </h2>

      {/* Comment List */}
      {comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg border border-border bg-bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-bg-tertiary flex items-center justify-center text-xs text-text-dim font-medium">
                  {comment.author_name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {comment.author_name}
                </span>
                <span className="text-xs text-text-dim">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <p className="text-sm text-text-secondary whitespace-pre-wrap">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-8 rounded-lg border border-border bg-bg-card">
          <p className="text-sm text-text-dim">No comments yet. Be the first!</p>
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary">Leave a Comment</h3>

        {error && (
          <div className="p-3 rounded-lg border border-error/30 bg-error/[0.05] text-xs text-error">
            {error}
          </div>
        )}

        <input
          type="text"
          required
          minLength={2}
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
        />

        <textarea
          required
          minLength={3}
          maxLength={2000}
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all resize-y"
        />

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-lg bg-accent-cyan text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 active:scale-[0.98] active:translate-y-px"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </section>
  );
}
