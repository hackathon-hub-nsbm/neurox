import Image from "next/image";
import TerminalCard from "./components/TerminalCard";

const LOG_LINES = [
  { text: "Initializing NeuroX neural interface...", delay: 0.3 },
  { text: "Loading system components...", delay: 0.6 },
  { text: "Establishing secure connection...", delay: 0.9 },
  { text: "Calibrating neural pathways...", delay: 1.2 },
];

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-8 max-w-md w-full px-4">
        {/* NeuroX logo — floats gently */}
        <Image
          src="/neurox.webp"
          alt="NeuroX"
          width={200}
          height={60}
          className="w-48 max-w-[80%] h-auto animate-[float_3s_ease-in-out_infinite]"
          priority
        />

        {/* Terminal boot panel */}
        <TerminalCard
          title="~/neurox/init.system --log"
          accent="cyan"
          className="w-full"
        >
          {/* Staggered boot log lines */}
          <div className="space-y-1.5 mb-4">
            {LOG_LINES.map((line) => (
              <p
                key={line.text}
                className="text-xs sm:text-sm text-text-secondary opacity-0"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  animation: `fade-in 0.3s ease-out ${line.delay}s forwards`,
                }}
              >
                <span className="text-accent-cyan mr-2">&gt;</span>
                {line.text}
              </p>
            ))}
          </div>

          {/* Progress bar with glow-border */}
          <div className="relative w-full h-1.5 rounded-full bg-bg-tertiary overflow-hidden glow-border">
            <div
              className="absolute inset-y-0 left-0 rounded-full w-3/5"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-purple))",
              }}
            >
              {/* Shimmer sweep across the bar */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  animation: "progress-shift 1.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Final ready line with blinking cursor */}
          <p
            className="text-xs sm:text-sm text-text-secondary opacity-0 terminal-cursor mt-3"
            style={{
              fontFamily: "var(--font-geist-mono)",
              animation: "fade-in 0.3s ease-out 1.5s forwards",
            }}
          >
            <span className="text-accent-cyan mr-2">&gt;</span>
            System ready.
          </p>
        </TerminalCard>
      </div>
    </div>
  );
}
