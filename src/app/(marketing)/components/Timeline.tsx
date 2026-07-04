import SectionHeading from "./SectionHeading";
import TerminalCard from "./TerminalCard";

const phases = [
  {
    number: "Phase 1",
    title: "Online Qualifier",
    subtitle: "Pitch & Proposal",
    date: "July 1–10, 2026",
    accent: "cyan" as const,
    details: [
      "Submit a 500-word project proposal outlining your AI-powered solution to a real-world problem.",
      "Include a high-level technical architecture diagram and feasibility assessment.",
      "Top 20 teams advance to Phase 2 based on innovation, feasibility, and potential impact.",
    ],
    deliverable: "Project proposal (PDF) + architecture diagram",
  },
  {
    number: "Phase 2",
    title: "Remote Build Week",
    subtitle: "Virtual Development Sprint",
    date: "July 12–20, 2026",
    accent: "purple" as const,
    details: [
      "Qualified teams build a working prototype remotely with access to mentorship sessions.",
      "Daily stand-ups with assigned industry mentors and technical advisors.",
      "Mid-week checkpoint submission to demonstrate progress and receive feedback.",
    ],
    deliverable: "Working prototype + code repository + 3-min demo video",
  },
  {
    number: "Phase 3",
    title: "Grand Finale",
    subtitle: "Live at NSBM Green University",
    date: "July 26–28, 2026",
    accent: "blue" as const,
    details: [
      "Top 10 teams present live at NSBM Green University before a panel of industry judges.",
      "Final pitch presentations, live demos, and Q&A sessions.",
      "Awards ceremony with prizes, certificates, and networking opportunities.",
    ],
    deliverable: "Live demo + final pitch deck + presentation",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section-divider py-24 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="02"
          title="Event timeline"
          subtitle="Three phases. One month. Infinite possibilities."
        />

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent-cyan-dim), rgba(0,240,255,0.08), var(--color-accent-cyan-dim), transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-12">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-start ${
                  i % 2 === 0 ? "" : "md:[direction:rtl]"
                }`}
              >
                {/* Dot on the timeline */}
                <div
                  className={`absolute left-3.5 md:left-1/2 top-6 w-2.5 h-2.5 rounded-full border-2 border-accent-cyan bg-bg-primary -translate-x-1/2 z-10 ${
                    phase.accent === "purple"
                      ? "border-accent-purple"
                      : phase.accent === "blue"
                        ? "border-accent-blue"
                        : ""
                  }`}
                  aria-hidden="true"
                />

                {/* Phase badge */}
                <div
                  className={`hidden md:flex ${i % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"} [direction:ltr]`}
                >
                  <div className="text-right">
                    <div
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        color:
                          phase.accent === "purple"
                            ? "var(--color-accent-purple)"
                            : phase.accent === "blue"
                              ? "var(--color-accent-blue)"
                              : "var(--color-accent-cyan)",
                      }}
                    >
                      {phase.date}
                    </div>
                    <div className="text-3xl font-black text-text-primary/10">
                      {phase.number.split(" ")[1]}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className={`[direction:ltr] ${i % 2 === 0 ? "" : "md:pl-8"}`}>
                  <TerminalCard
                    title={`neurox/${phase.number.toLowerCase().replace(" ", "-")}`}
                    accent={phase.accent}
                  >
                    <div className="md:hidden mb-2">
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          color:
                            phase.accent === "purple"
                              ? "var(--color-accent-purple)"
                              : phase.accent === "blue"
                                ? "var(--color-accent-blue)"
                                : "var(--color-accent-cyan)",
                        }}
                      >
                        {phase.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {phase.title}
                    </h3>
                    <p
                      className="text-sm mb-4"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        color:
                          phase.accent === "purple"
                            ? "var(--color-accent-purple)"
                            : phase.accent === "blue"
                              ? "var(--color-accent-blue)"
                              : "var(--color-accent-cyan)",
                      }}
                    >
                      {phase.subtitle}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {phase.details.map((detail, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-text-secondary leading-relaxed"
                        >
                          <span className="text-accent-cyan shrink-0 mt-0.5">
                            ▹
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-border">
                      <span className="text-xs text-text-dim tracking-wide uppercase">
                        Deliverable:
                      </span>{" "}
                      <span
                        className="text-xs font-semibold"
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          color:
                            phase.accent === "purple"
                              ? "var(--color-accent-purple)"
                              : phase.accent === "blue"
                                ? "var(--color-accent-blue)"
                                : "var(--color-accent-cyan)",
                        }}
                      >
                        {phase.deliverable}
                      </span>
                    </div>
                  </TerminalCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
