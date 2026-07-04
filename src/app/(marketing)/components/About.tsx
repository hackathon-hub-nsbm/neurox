import SectionHeading from "./SectionHeading";
import TerminalCard from "./TerminalCard";

export default function About() {
  return (
    <section id="about" className="pt-24 md:pt-40 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="01"
          title="About NeuroX"
          subtitle="A three-phase AI innovation sprint organized by NSBM Hackathon Hub"
        />

        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Main text */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              NeuroX is an immersive, three-phase hackathon that brings together
              Sri Lanka&apos;s brightest undergraduate minds to tackle
              real-world problems through the lens of artificial intelligence
              and neural computing.
            </p>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              Organized by the{" "}
              <span className="text-accent-cyan font-semibold">
                NSBM Hackathon Hub
              </span>
              —NSBM Green University&apos;s premier innovation community—NeuroX
              bridges the gap between academic theory and industry-ready
              solutions. Whether you&apos;re a seasoned coder or just starting
              your AI journey, NeuroX provides the mentorship, resources, and
              platform to build something extraordinary.
            </p>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              Over three intense phases spanning July 2026, teams will compete
              through an online qualifier, a remote build week, and culminate in
              a live grand finale at NSBM Green University.
            </p>
          </div>

          {/* Terminal sidebar — offset vertically for staggered look */}
          <div className="md:col-span-2 md:mt-12">
            <TerminalCard title="~/neurox/mission.sh" accent="purple">
              <div
                className="space-y-2 text-sm"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <p>
                  <span className="text-accent-cyan">$</span>{" "}
                  <span className="text-text-secondary">
                    cat /etc/neurox/mission
                  </span>
                </p>
                <p className="text-text-secondary pl-4 border-l border-border">
                  Empower Sri Lankan undergraduates to innovate at the
                  intersection of AI and real-world problem solving.
                </p>
                <p className="mt-3">
                  <span className="text-accent-cyan">$</span>{" "}
                  <span className="text-text-dim">_</span>
                </p>
              </div>
            </TerminalCard>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { value: "3", label: "Phases" },
                { value: "31", label: "Days in July" },
                { value: "4", label: "Max Team Size" },
                { value: "∞", label: "Possibilities" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-lg bg-bg-card border border-border text-center"
                >
                  <div className="text-xl font-bold gradient-text-cyan">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-dim mt-1 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
