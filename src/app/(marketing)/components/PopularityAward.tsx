const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const PDF_URL = `${SUPABASE_URL}/storage/v1/object/public/project-assets/awards/popular-choice-guidelines.pdf`;

export default function PopularityAward() {
  return (
    <div className="mb-16">
      {/* Sub-section heading */}
      <div className="mb-8">
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-geist-mono)",
            color: "var(--color-accent-pink)",
          }}
        >
          Special Award
        </span>
      </div>

      {/* Split-card layout */}
      <div className="grid lg:grid-cols-[5fr_4fr] gap-4 md:gap-6">
        {/* ================================================================ */}
        {/* LEFT — The Challenge (featured card)                             */}
        {/* ================================================================ */}
        <div className="glow-border-active rounded-lg">
          <div className="rounded-lg border border-border bg-bg-card p-6 md:p-8 h-full flex flex-col">
            {/* Tagline */}
            <p
              className="text-lg md:text-xl font-bold gradient-text-cyan mb-3"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Showcase Your Journey. Share Your Idea. Rally Your Community.
            </p>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              The Popular Choice Award is an Instagram + LinkedIn engagement
              challenge. Create a 60–90 second vertical video showcasing your
              project journey, the problem you're solving, and the business value
              of your idea. The video with the highest authentic engagement wins.
            </p>

            {/* Key dates */}
            <div
              className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-lg border"
              style={{
                borderColor: "var(--color-accent-pink)",
                borderLeftWidth: "2px",
                background: "var(--color-accent-cyan-dim)",
              }}
            >
              {[
                { label: "Video Submission", date: "July 15", icon: "📩" },
                { label: "Voting Ends", date: "July 24", icon: "🗳️" },
              ].map((d) => (
                <div key={d.label}>
                  <span
                    className="text-[10px] tracking-widest uppercase block mb-0.5"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color: "var(--color-accent-pink)",
                    }}
                  >
                    {d.icon} {d.label}
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {d.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Prize callout + Download */}
            <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-xs text-text-secondary">
                💰 Cash reward for the most popular team
              </span>
              <a
                href={PDF_URL}
                download="popular-choice-guidelines.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                  border border-border bg-bg-tertiary text-sm
                  hover:border-accent-cyan/50 hover:text-accent-cyan
                  transition-all active:scale-[0.98]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <span>📄</span>
                <span>Download Full Guidelines</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* RIGHT — Guidelines at a Glance (terminal card)                   */}
        {/* ================================================================ */}
        <div className="rounded-lg border border-border bg-bg-card overflow-hidden">
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-bg-tertiary)",
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-error" />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#eab308" }}
            />
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span
              className="ml-2 text-[10px] tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: "var(--color-text-dim)",
              }}
            >
              GUIDELINES.MD
            </span>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 space-y-5">
            {/* Video Specs */}
            <div>
              <h4
                className="text-[10px] tracking-widest uppercase mb-3"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                📱 Video Specs
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Format", "Vertical 9:16"],
                  ["Resolution", "1080 × 1920"],
                  ["Frame Rate", "30fps / 60fps"],
                  ["Duration", "60–90 seconds"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="p-2.5 rounded border border-border"
                    style={{ background: "var(--color-bg-tertiary)" }}
                  >
                    <span
                      className="text-[9px] tracking-widest uppercase block"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        color: "var(--color-text-dim)",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs text-text-primary"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Script Structure */}
            <div>
              <h4
                className="text-[10px] tracking-widest uppercase mb-3"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                🎬 Script Structure
              </h4>
              <div className="space-y-2">
                {[
                  {
                    time: "0:00–0:15",
                    label: "INTRO",
                    desc: "Introduce your team. Mention NeuroX 1.0. Thank NSBM Hackathon Hub.",
                  },
                  {
                    time: "0:15–0:45",
                    label: "CONCEPT",
                    desc: "Explain your idea. How it works. Keep business value simple.",
                  },
                  {
                    time: "0:45–1:00+",
                    label: "CTA",
                    desc: "Ask viewers to like & share. Mandatory team sign-off.",
                  },
                ].map((step) => (
                  <div key={step.label} className="flex gap-3">
                    <span
                      className="text-[10px] shrink-0 w-16 text-right"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        color: "var(--color-accent-pink)",
                      }}
                    >
                      {step.time}
                    </span>
                    <div>
                      <span
                        className="text-[10px] tracking-widest"
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          color: "var(--color-accent-cyan)",
                        }}
                      >
                        {step.label}
                      </span>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dos & Don'ts */}
            <div>
              <h4
                className="text-[10px] tracking-widest uppercase mb-3"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                ✅ Dos & Don'ts
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span
                    className="text-[10px] tracking-widest uppercase block mb-1.5"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color: "var(--color-success)",
                    }}
                  >
                    Do
                  </span>
                  <ul className="space-y-1">
                    {[
                      "Be enthusiastic & professional",
                      "Keep project explanation simple",
                      "Explain business value clearly",
                      "Ensure good audio & lighting",
                    ].map((item) => (
                      <li
                        key={item}
                        className="text-xs text-text-secondary flex gap-1.5"
                      >
                        <span style={{ color: "var(--color-success)" }}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span
                    className="text-[10px] tracking-widest uppercase block mb-1.5"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color: "var(--color-error)",
                    }}
                  >
                    Don&apos;t
                  </span>
                  <ul className="space-y-1">
                    {[
                      "Use heavy technical jargon",
                      "Use copyrighted music",
                      "Buy fake likes or engagement",
                      "Manipulate voting analytics",
                    ].map((item) => (
                      <li
                        key={item}
                        className="text-xs text-text-secondary flex gap-1.5"
                      >
                        <span style={{ color: "var(--color-error)" }}>✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div
              className="flex items-center gap-3 pt-2 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--color-text-dim)",
                }}
              >
                Platforms:
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  borderColor: "var(--color-accent-pink)",
                  color: "var(--color-accent-pink)",
                  background: "var(--color-accent-cyan-dim)",
                }}
              >
                Instagram
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  borderColor: "var(--color-accent-blue)",
                  color: "var(--color-accent-blue)",
                  background: "var(--color-accent-blue-dim)",
                }}
              >
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
