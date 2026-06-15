import { createSupabaseServerClient } from "@/lib/supabase";
import ProjectCard from "../components/ProjectCard";
import SearchFilterBar from "../components/SearchFilterBar";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface ProjectRow {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  track: string | null;
  github_url: string | null;
  demo_url: string | null;
  created_at: string;
  registration: {
    team_name: string;
    university: string;
  } | null;
  screenshots: { storage_path: string }[];
  votes_count: { count: number }[];
}

function screenshotUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/project-assets/${path}`;
}

export default async function ProjectGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tech?: string; track?: string }>;
}) {
  const params = await searchParams;
  const supabase = createSupabaseServerClient();

  // Fetch all projects with team info, screenshots, and vote counts
  let query = supabase.from("projects").select(`
    id, name, tagline, technologies, track, created_at,
    registration:registrations!projects_registration_id_fkey(team_name, university),
    screenshots:project_screenshots(storage_path),
    votes_count:votes(count)
  `);

  // Apply filters
  if (params.search) {
    const searchTerm = `%${params.search}%`;
    query = query.or(
      `name.ilike.${searchTerm},tagline.ilike.${searchTerm},description.ilike.${searchTerm}`
    );
  }
  if (params.track) {
    query = query.eq("track", params.track);
  }

  const { data: projects, error } = await query
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Failed to fetch projects:", error);
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-text-secondary">Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  const typedProjects = (projects ?? []) as unknown as ProjectRow[];

  // Apply client-side tech filter (since tech is a text array, we filter after fetch)
  let filteredProjects = typedProjects;
  if (params.tech) {
    const techTerm = params.tech.toLowerCase();
    filteredProjects = typedProjects.filter((p) =>
      p.technologies.some((t) => t.toLowerCase().includes(techTerm))
    );
  }

  // Gather unique tracks and technologies for filter options
  const allTracks = [...new Set(typedProjects.map((p) => p.track).filter(Boolean))] as string[];
  const allTechnologies = [
    ...new Set(typedProjects.flatMap((p) => p.technologies).filter(Boolean)),
  ].sort();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          NeuroX Projects
        </h1>
        <p className="text-text-secondary">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""} submitted
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar tracks={allTracks} technologies={allTechnologies} />

      {/* Project Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-text-dim"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            No projects found
          </h2>
          <p className="text-sm text-text-secondary">
            {params.search || params.tech || params.track
              ? "Try adjusting your filters."
              : "Projects will appear here once teams start submitting."}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              tagline={project.tagline}
              technologies={project.technologies}
              track={project.track}
              teamName={project.registration?.team_name ?? "Unknown Team"}
              university={project.registration?.university ?? ""}
              screenshotPath={
                project.screenshots?.[0]?.storage_path
                  ? screenshotUrl(project.screenshots[0].storage_path)
                  : null
              }
              voteCount={project.votes_count?.[0]?.count ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
