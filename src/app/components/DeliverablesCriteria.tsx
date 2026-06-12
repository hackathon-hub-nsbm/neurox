import SectionHeading from "./SectionHeading";
import TerminalCard from "./TerminalCard";

const deliverables = [
  {
    title: "Working Prototype",
    description:
      "A functional software prototype or proof-of-concept that demonstrates the core AI capability of your solution.",
  },
  {
    title: "Code Repository",
    description:
      "A well-documented public or private Git repository with clear README, setup instructions, and commit history.",
  },
  {
    title: "Pitch Deck",
    description:
      "A 10-slide presentation covering problem statement, solution, technical architecture, market analysis, and team profile.",
  },
  {
    title: "Demo Video",
    description:
      "A 3-minute video walkthrough showing your prototype in action, key features, and the team's development journey.",
  },
];

const evaluationCriteria = [
  { label: "Innovation & Originality", weight: 30, color: "var(--color-accent-cyan)" },
  {
    label: "Technical Complexity",
    weight: 25,
    color: "var(--color-accent-purple)",
  },
  { label: "Practical Impact", weight: 25, color: "var(--color-accent-blue)" },
  { label: "Presentation Quality", weight: 20, color: "var(--color-accent-pink)" },
];

export default function DeliverablesCriteria() {
  return (
    <section id="criteria" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="04"
          title="Deliverables & Evaluation"
          subtitle="What you'll submit and how you'll be judged"
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Deliverables */}
          <div>
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-geist-mono)", color: "var(--color-accent-cyan)" }}
            >
              Required Deliverables
            </h3>
            <div className="space-y-4">
              {deliverables.map((item, i) => (
                <TerminalCard
                  key={item.title}
                  title={`deliverable_0${i + 1}.md`}
                  accent="cyan"
                >
                  <h4 className="font-semibold text-text-primary text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </TerminalCard>
              ))}
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div>
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: "var(--color-accent-purple)",
              }}
            >
              Evaluation Criteria
            </h3>
            <div className="space-y-4">
              {evaluationCriteria.map((criterion) => (
                <div
                  key={criterion.label}
                  className="p-4 rounded-lg border border-border bg-bg-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-sm font-semibold text-text-primary"
                    >
                      {criterion.label}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        color: criterion.color,
                      }}
                    >
                      {criterion.weight}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${criterion.weight}%`,
                        background: `linear-gradient(90deg, ${criterion.color}, ${criterion.color}88)`,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="p-4 rounded-lg border border-accent-cyan/20 bg-accent-cyan/[0.03] flex items-center justify-between">
                <span className="text-sm font-semibold text-accent-cyan">
                  Total Score
                </span>
                <span
                  className="text-sm font-bold text-accent-cyan"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
