"use client";

import { useActionState, useState, useRef, useCallback } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { submitProject, type SubmitProjectState } from "@/app/actions/projects";
import { verifyTeamAccess } from "@/app/actions/auth";

const projectInitialState: SubmitProjectState = {
  success: false,
  message: "",
};

// ---------------------------------------------------------------------------
// Access Code Gate
// ---------------------------------------------------------------------------

function AccessCodeGate({
  onAuthenticated,
}: {
  onAuthenticated: (teamName: string) => void;
}) {
  const [teamName, setTeamName] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await verifyTeamAccess(teamName, token);
    setLoading(false);

    if (result.success) {
      onAuthenticated(result.teamName || teamName);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Submit Your Project
        </h1>
        <p className="text-sm text-text-secondary">
          Enter your team name and the submission token you received during
          registration.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl border border-border bg-bg-card space-y-4"
      >
        {error && (
          <div className="p-3 rounded-lg border border-error/30 bg-error/[0.05] text-sm text-error">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="gate-teamName"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Team Name
          </label>
          <input
            type="text"
            id="gate-teamName"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g., Neural Knights"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="gate-token"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Submission Token
          </label>
          <input
            type="text"
            id="gate-token"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your submission token"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-accent-cyan text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue to Submission"}
        </button>

        <p className="text-xs text-text-dim text-center">
          Lost your token? Contact us at hackathonhub@nsbm.ac.lk
        </p>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screenshot Upload
// ---------------------------------------------------------------------------

function ScreenshotUpload({ error }: { error?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync files to the real file input using DataTransfer
  const syncToInput = useCallback(
    (fileList: File[]) => {
      const dt = new DataTransfer();
      fileList.forEach((f) => dt.items.add(f));
      if (inputRef.current) {
        inputRef.current.files = dt.files;
      }
    },
    []
  );

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles).filter((f) =>
        f.type.startsWith("image/")
      );
      const combined = [...files, ...arr].slice(0, 5);

      // Revoke old previews
      previews.forEach((p) => URL.revokeObjectURL(p));

      setFiles(combined);
      setPreviews(combined.map((f) => URL.createObjectURL(f)));
      syncToInput(combined);
    },
    [files, previews, syncToInput]
  );

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    syncToInput(newFiles);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        Screenshots <span className="text-error">*</span>
      </label>
      <p className="text-xs text-text-dim mb-3">
        Upload up to 5 screenshots of your project. PNG, JPEG, WebP, or GIF (max 5MB each).
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-accent-cyan bg-accent-cyan-dim"
            : "border-border hover:border-text-dim"
        } ${files.length >= 5 ? "pointer-events-none opacity-50" : ""}`}
      >
        <svg
          className="w-8 h-8 mx-auto mb-2 text-text-dim"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="text-sm text-text-secondary">
          {files.length === 0
            ? "Drag & drop screenshots here, or click to browse"
            : `${files.length}/5 uploaded — click or drop to add more`}
        </p>
        <p className="text-xs text-text-dim mt-1">
          {5 - files.length} slot{5 - files.length !== 1 ? "s" : ""} remaining
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        name="screenshots"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && addFiles(e.target.files)}
      />

      {error && (
        <p className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {error}
        </p>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
          {previews.map((src, i) => (
            <div key={i} className="relative group aspect-video rounded-md overflow-hidden border border-border">
              <img
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-bg-primary/80 text-error text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove screenshot ${i + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Submit Button
// ---------------------------------------------------------------------------

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="w-full py-3 px-6 rounded-lg bg-accent-cyan text-white font-semibold text-sm uppercase tracking-wider transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Submitting...
        </>
      ) : (
        "Submit Project"
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Project Submit Form
// ---------------------------------------------------------------------------

function ProjectSubmitForm({ teamName }: { teamName: string }) {
  const [state, action] = useActionState(submitProject, projectInitialState);
  const router = useRouter();

  // On success, redirect to the project page
  if (state.success && state.projectId) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Project Submitted!
        </h1>
        <p className="text-text-secondary mb-6">{state.message}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`/projects/${state.projectId}`)}
            className="px-6 py-2.5 rounded-lg bg-accent-cyan text-white font-semibold text-sm transition-all hover:opacity-90"
          >
            View Your Project
          </button>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="px-6 py-2.5 rounded-lg border border-border text-text-secondary text-sm hover:text-text-primary transition-colors"
          >
            Browse Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-text-secondary">
          Submitting as{" "}
          <span className="text-accent-cyan font-semibold">{teamName}</span>
        </p>
      </div>

      {!state.success && state.message && !state.errors && (
        <div className="mb-6 p-4 rounded-lg border border-error/30 bg-error/[0.05] text-sm text-error">
          {state.message}
        </div>
      )}

      <form action={action} className="space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
            Project Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={3}
            defaultValue={(state as { errors?: Record<string, string> }).errors ? "" : ""}
            placeholder="e.g., AI Crop Doctor"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
          />
          {state.errors?.name && (
            <p className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
              {state.errors.name}
            </p>
          )}
        </div>

        {/* Tagline */}
        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-text-primary mb-1.5">
            Tagline <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            required
            minLength={10}
            maxLength={120}
            placeholder="A short, catchy description of your project"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
          />
          {state.errors?.tagline && (
            <p className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
              {state.errors.tagline}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1.5">
            Description <span className="text-error">*</span>
          </label>
          <p className="text-xs text-text-dim mb-2">
            Describe what your project does, how it works, and the problem it solves. At least 100 characters.
          </p>
          <textarea
            id="description"
            name="description"
            required
            minLength={100}
            rows={6}
            placeholder="Our project addresses..."
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all resize-y"
          />
          {state.errors?.description && (
            <p className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
              {state.errors.description}
            </p>
          )}
        </div>

        {/* Technologies */}
        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-text-primary mb-1.5">
            Technologies Used <span className="text-error">*</span>
          </label>
          <p className="text-xs text-text-dim mb-2">
            List the technologies, frameworks, and tools used. Separate with commas. (e.g., React, Python, TensorFlow)
          </p>
          <input
            type="text"
            id="technologies"
            name="technologies"
            required
            placeholder="React, Python, TensorFlow, Supabase"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
          />
          {state.errors?.technologies && (
            <p className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
              {state.errors.technologies}
            </p>
          )}
        </div>

        {/* Track */}
        <div>
          <label htmlFor="track" className="block text-sm font-medium text-text-primary mb-1.5">
            Track / Category
          </label>
          <select
            id="track"
            name="track"
            defaultValue=""
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
          >
            <option value="">Select a track (optional)</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Sustainability">Sustainability</option>
            <option value="FinTech">FinTech</option>
            <option value="Web3 & Blockchain">Web3 & Blockchain</option>
            <option value="Open Innovation">Open Innovation</option>
          </select>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-text-primary">Links</p>
          <div>
            <label htmlFor="githubUrl" className="block text-xs text-text-secondary mb-1">
              GitHub Repository
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/yourteam/project"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="demoUrl" className="block text-xs text-text-secondary mb-1">
              Demo Video URL
            </label>
            <input
              type="url"
              id="demoUrl"
              name="demoUrl"
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="liveUrl" className="block text-xs text-text-secondary mb-1">
              Live Demo / Deployed URL
            </label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              placeholder="https://your-project.vercel.app"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none text-sm transition-all"
            />
          </div>
        </div>

        {/* Screenshots */}
        <ScreenshotUpload error={state.errors?.screenshots} />

        {/* Submit */}
        <SubmitButton />

        <p className="text-xs text-text-dim text-center">
          By submitting, you confirm that this is original work created by your
          team during the NeuroX hackathon.
        </p>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProjectSubmitPage() {
  const [authenticatedTeam, setAuthenticatedTeam] = useState<string | null>(null);

  if (!authenticatedTeam) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <AccessCodeGate onAuthenticated={setAuthenticatedTeam} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-3xl font-bold text-text-primary mb-2">
        Submit Your Project
      </h1>
      <p className="text-text-secondary mb-10">
        Share what you built during NeuroX 2026.
      </p>
      <ProjectSubmitForm teamName={authenticatedTeam} />
    </div>
  );
}
