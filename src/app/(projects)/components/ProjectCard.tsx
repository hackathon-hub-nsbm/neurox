import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  tagline: string;
  technologies: string[];
  track: string | null;
  teamName: string;
  university: string;
  screenshotPath: string | null;
  voteCount: number;
}

export default function ProjectCard({
  id,
  name,
  tagline,
  technologies,
  track,
  teamName,
  university,
  screenshotPath,
  voteCount,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="group block rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-accent-cyan/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.06)] transition-all"
    >
      {/* Screenshot */}
      <div className="aspect-video bg-bg-tertiary overflow-hidden">
        {screenshotPath ? (
          <img
            src={screenshotPath}
            alt={`${name} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-dim">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-text-primary text-lg mb-1 group-hover:text-accent-cyan transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">{tagline}</p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-bg-tertiary text-text-secondary border border-border"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] text-text-dim">
                +{technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">
              {teamName}
            </p>
            <p className="text-[11px] text-text-dim truncate">{university}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-3">
            {track && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent-cyan-dim text-accent-cyan font-medium">
                {track}
              </span>
            )}
            <span className="flex items-center gap-0.5 text-xs text-text-dim">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              {voteCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
