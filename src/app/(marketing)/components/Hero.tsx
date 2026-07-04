import Image from "next/image";
import GlitchText from "./GlitchText";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >

      {/* Top glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,240,255,0.08) 0%, rgba(0,240,255,0.03) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-16">
          {/* Left: Content */}
          <div className="text-center md:text-left">
            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-4 max-w-2xl leading-relaxed">
              Where Neural Networks Meet <br className="sm:hidden" />
              <GlitchText as="span" className="gradient-text-cyan font-semibold">
                Real-World Innovation
              </GlitchText>
            </p>

            {/* Date badge */}
            <div
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm mb-10"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span className="px-3 py-1.5 rounded-md bg-bg-tertiary border border-border text-accent-cyan">
                July 2026
              </span>
              <span className="text-text-dim">·</span>
              <span className="px-3 py-1.5 rounded-md bg-bg-tertiary border border-border text-text-secondary">
                3 Phases
              </span>
              <span className="text-text-dim">·</span>
              <span className="px-3 py-1.5 rounded-md bg-bg-tertiary border border-border text-text-secondary">
                NSBM Green University
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
          <a
            href="#register"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent-cyan text-bg-primary font-semibold text-sm uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-[0.98] active:translate-y-px active:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <span className="relative z-10">Register Your Team</span>
            <svg
              className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-lg border border-border hover:border-accent-cyan/50 text-text-secondary hover:text-accent-cyan text-sm uppercase tracking-widest transition-all active:scale-[0.98] active:translate-y-px active:bg-bg-tertiary/50"
          >
            Learn More
          </a>
            </div>
          </div>

          {/* Right: Logo — offset, bleeds on widescreen */}
          <div className="hidden md:block">
            <Image
              src="/neurox.webp"
              alt="NeuroX"
              width={600}
              height={180}
              className="w-80 lg:w-[28rem] h-auto"
              priority
            />
          </div>

          {/* Mobile logo (centered, smaller) */}
          <Image
            src="/neurox.webp"
            alt="NeuroX"
            width={400}
            height={120}
            className="w-4/5 max-w-sm h-auto mx-auto mb-6 md:hidden"
            priority
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim">
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-border flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-accent-cyan animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
