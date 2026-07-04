import type { ReactNode } from "react";

interface TerminalCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  /** Accent color for the terminal dots. Default cyan. */
  accent?: "cyan" | "purple" | "blue";
}

const dotColors: Record<string, string> = {
  cyan: "bg-accent-cyan",
  purple: "bg-accent-purple",
  blue: "bg-accent-blue",
};

export default function TerminalCard({
  title,
  children,
  className = "",
  accent = "cyan",
}: TerminalCardProps) {
  const dotColor = dotColors[accent] || dotColors.cyan;

  return (
    <div
      className={`relative rounded-md overflow-hidden border border-border bg-bg-card hover:-translate-y-0.5 transition-transform duration-200 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-border">
        {/* Traffic light dots */}
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}/70`} />
        </div>
        {/* Title */}
        <span
          className="text-xs text-text-secondary truncate terminal-cursor"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}
