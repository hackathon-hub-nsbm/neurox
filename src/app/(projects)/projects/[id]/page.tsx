import { createSupabaseServerClient } from "@/lib/supabase";
import Link from "next/link";
import type { Metadata } from "next";
import ScreenshotCarousel from "../../components/ScreenshotCarousel";
import VoteButton from "../../components/VoteButton";
import CommentSection from "../../components/CommentSection";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

function screenshotUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/project-assets/${path}`;
}

interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  track: string | null;
  github_url: string | null;
  demo_url: string | null;
  live_url: string | null;
  created_at: string;
  registration: {
    id: string;
    team_name: string;
    university: string;
    members: { name: string; email: string }[];
  } | null;
  screenshots: { id: string; storage_path: string; alt_text: string | null }[];
  votes: { id: string }[];
  comments: { id: string; author_name: string; body: string; created_at: string }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("name, tagline")
    .eq("id", id)
    .single();

  if (!data) return { title: "Project Not Found — NeuroX" };

  return {
    title: `${data.name} — NeuroX Projects`,
    description: data.tagline,
    openGraph: {
      title: data.name,
      description: data.tagline,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id, name, tagline, description, technologies, track,
      github_url, demo_url, live_url, created_at,
      registration:registrations!projects_registration_id_fkey(
        id, team_name, university, members
      ),
      screenshots:project_screenshots(id, storage_path, alt_text),
      votes(id),
      comments(id, author_name, body, created_at)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
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

  const project = data as unknown as ProjectData;
  const screenshots = (project.screenshots ?? []).sort(
    (a, b) =>
      parseInt(a.storage_path.split("-")[0] ?? "0") -
      parseInt(b.storage_path.split("-")[0] ?? "0")
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent-cyan transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Gallery
      </Link>

      {/* Hero */}
      <div className="mb-10">
        {screenshots.length > 0 && (
          <ScreenshotCarousel
            screenshots={screenshots.map((s) => ({
              url: screenshotUrl(s.storage_path),
              alt: s.alt_text ?? project.name,
            }))}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {project.name}
            </h1>
            <p className="text-lg text-text-secondary">{project.tagline}</p>
          </div>
          <VoteButton
            projectId={project.id}
            initialCount={project.votes?.length ?? 0}
          />
        </div>

        {project.track && (
          <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-accent-cyan-dim text-accent-cyan">
            {project.track}
          </span>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              About This Project
            </h2>
            <div className="prose-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
              {project.description}
            </div>
          </section>

          {/* Technologies */}
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-lg bg-bg-tertiary text-text-secondary border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Links */}
          {(project.github_url || project.demo_url || project.live_url) && (
            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-bg-card text-sm text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-bg-card text-sm text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Demo Video
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-bg-card text-sm text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Comments */}
          <CommentSection
            projectId={project.id}
            initialComments={project.comments ?? []}
          />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Team Card */}
          <div className="p-6 rounded-xl border border-border bg-bg-card">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Team
            </h2>
            <p className="text-base font-medium text-text-primary">
              {project.registration?.team_name}
            </p>
            <p className="text-sm text-text-secondary mb-4">
              {project.registration?.university}
            </p>

            {project.registration?.members &&
              project.registration.members.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-text-dim uppercase tracking-wider">
                    Members
                  </h3>
                  <ul className="space-y-1.5">
                    {(project.registration.members as { name: string; email: string }[]).map(
                      (member, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <span className="w-6 h-6 rounded-full bg-bg-tertiary flex items-center justify-center text-xs text-text-dim font-medium">
                            {member.name.charAt(0)}
                          </span>
                          <span>{member.name}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>

          {/* Submitted */}
          <div className="p-6 rounded-xl border border-border bg-bg-card">
            <h3 className="text-xs font-medium text-text-dim uppercase tracking-wider mb-2">
              Submitted
            </h3>
            <p className="text-sm text-text-secondary">
              {new Date(project.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
