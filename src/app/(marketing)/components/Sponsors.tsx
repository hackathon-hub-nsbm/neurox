import Image from "next/image";
import SectionHeading from "./SectionHeading";

interface Sponsor {
  name: string;
  role: string;
  tier: "exclusive" | "partner";
  logo: string;
  bgLight?: boolean;
  accentColor: string;
}

const mainSponsor: Sponsor = {
  name: "CueGrowth",
  role: "Official Exclusive Partner",
  tier: "exclusive",
  logo: "/sponsors/cueGrowth.png",
  accentColor: "var(--color-accent-cyan)",
};

const supportingSponsors: Sponsor[] = [
  {
    name: "ART Television",
    role: "Official Television Partner",
    tier: "partner",
    logo: "/sponsors/artTv.jpg",
    accentColor: "var(--color-accent-blue)",
  },
  {
    name: "HYPER NEXUS Ultra",
    role: "Official Innovation Partner",
    tier: "partner",
    logo: "/sponsors/hyper-nexus-ultra-logo.png",
    bgLight: true,
    accentColor: "var(--color-accent-purple)",
  },
  {
    name: "Hack SL",
    role: "Official Media Partner",
    tier: "partner",
    logo: "/sponsors/hackSl.png",
    bgLight: true,
    accentColor: "var(--color-accent-pink)",
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-divider pt-20 md:pt-28 pb-24 md:pb-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow for main sponsor emphasis */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-cyan/10 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          number="06"
          title="Sponsors & Partners"
          subtitle="Empowering technological breakthroughs through strategic industry collaboration"
        />

        {/* MAIN SPONSOR / EXCLUSIVE PARTNER - HERO TIER */}
        <div className="mb-12 md:mb-16">
          <div className="relative rounded-2xl bg-bg-card border border-accent-cyan/40 p-8 md:p-12 glow-border-active transition-all duration-500 shadow-[0_0_50px_rgba(0,240,255,0.12)]">
            
            {/* Cyber Corner Tech Brackets */}
            <span className="absolute top-2 left-2 text-accent-cyan/60 font-mono text-xs select-none pointer-events-none">┌── SYS.PARTNER_01</span>
            <span className="absolute top-2 right-2 text-accent-cyan/60 font-mono text-xs select-none pointer-events-none">──┐</span>
            <span className="absolute bottom-2 left-2 text-accent-cyan/60 font-mono text-xs select-none pointer-events-none">└── PREMIER_TIER</span>
            <span className="absolute bottom-2 right-2 text-accent-cyan/60 font-mono text-xs select-none pointer-events-none">──┘</span>

            {/* Floating Top Badge */}
            <div className="flex justify-center mb-6">
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-cyan/40 bg-accent-cyan-dim backdrop-blur-md text-accent-cyan text-xs md:text-sm font-semibold uppercase tracking-widest"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                {mainSponsor.role}
              </div>
            </div>

            {/* Logo & Content Showcase */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group my-4 p-4 sm:p-6 rounded-xl bg-black/60 border border-accent-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 group-hover:border-accent-cyan group-hover:scale-105">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 flex items-center justify-center">
                  <Image
                    src={mainSponsor.logo}
                    alt={mainSponsor.name}
                    fill
                    className="object-contain p-2 rounded-lg drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    priority
                  />
                </div>
              </div>

              <h3 
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mt-2 gradient-text-cyan"
              >
                {mainSponsor.name}
              </h3>

              <div 
                className="mt-3 flex items-center gap-3 text-xs md:text-sm text-text-secondary"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <span className="text-accent-cyan">[ PATRON_STATUS: ACTIVE ]</span>
                <span className="text-border">|</span>
                <span className="text-text-dim">ANCHOR_SPONSOR // NEUROX_2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING PARTNERS GRID */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-border flex-1" />
            <span 
              className="text-xs uppercase tracking-widest text-text-dim px-2"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Official Event Partners
            </span>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingSponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group relative rounded-xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] flex flex-col items-center text-center"
              >
                {/* Role Badge */}
                <div
                  className="text-[11px] tracking-wider uppercase mb-4 px-3 py-1 rounded-md border border-border/80 bg-bg-tertiary/60"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    color: sponsor.accentColor,
                  }}
                >
                  {sponsor.role}
                </div>

                {/* Logo Frame */}
                <div 
                  className={`relative w-full h-32 mb-4 rounded-lg flex items-center justify-center p-4 border border-border/50 transition-transform duration-300 group-hover:scale-102 ${
                    sponsor.bgLight ? "bg-white/95" : "bg-black/40"
                  }`}
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name */}
                <h4 className="font-bold text-text-primary text-base md:text-lg">
                  {sponsor.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
