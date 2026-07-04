import SectionHeading from "./SectionHeading";

const prizes = [
  {
    place: "2nd Runner-Up",
    rank: "3rd",
    prize: "LKR 30,000",
    extras: ["Certificate of Achievement", "NSBM Hackathon Hub Swag Pack", "Industry Recognition"],
    accent: "var(--color-accent-blue)",
    featured: false,
  },
  {
    place: "Grand Champion",
    rank: "1st",
    prize: "LKR 100,000",
    extras: [
      "Champion Trophy",
      "Certificate of Excellence",
      "NSBM Hackathon Hub Premium Swag Pack",
      "Incubation Opportunity at NSBM Innovation Hub",
      "Featured Interview on NSBM Media",
    ],
    accent: "var(--color-accent-cyan)",
    featured: true,
  },
  {
    place: "1st Runner-Up",
    rank: "2nd",
    prize: "LKR 50,000",
    extras: ["Certificate of Distinction", "NSBM Hackathon Hub Swag Pack", "Mentorship Session with Industry Experts"],
    accent: "var(--color-accent-purple)",
    featured: false,
  },
];

export default function Outcomes() {
  return (
    <section id="prizes" className="section-divider pt-20 md:pt-28 pb-24 md:pb-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="05"
          title="Prizes & outcomes"
          subtitle="Recognition, rewards, and opportunities beyond the hackathon"
        />

        {/* Prize cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-end mb-16">
          {prizes.map((prize) => (
            <div
              key={prize.place}
              className={`relative rounded-lg border bg-bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.08)] ${
                prize.featured
                  ? "border-accent-cyan/40 md:-mt-4 md:mb-4 md:scale-[1.03] glow-border-active z-10"
                  : "border-border hover:border-accent-cyan/20"
              }`}
              style={{ order: prize.featured ? 0 : prize.rank === "2nd" ? -1 : 1 }}
            >
              {/* Rank badge */}
              <div
                className={`text-xs tracking-widest uppercase mb-2`}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: prize.accent,
                }}
              >
                {prize.place}
              </div>
              <div
                className={`text-3xl md:text-4xl font-black mb-1`}
                style={{ fontFamily: "var(--font-geist-mono)", color: prize.accent }}
              >
                {prize.rank}
              </div>
              <div className="text-2xl font-bold text-text-primary mb-4">
                {prize.prize}
              </div>
              <ul className="space-y-2">
                {prize.extras.map((extra, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-text-secondary"
                  >
                    <span style={{ color: prize.accent }}>✦</span>
                    {extra}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional outcomes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              icon: "🎓",
              title: "Certificates for All",
              description:
                "Every participant who completes all three phases receives a verified digital certificate from NSBM Hackathon Hub.",
            },
            {
              icon: "🤝",
              title: "Industry Networking",
              description:
                "Connect with judges and mentors from Sri Lanka's top tech companies during the Grand Finale.",
            },
            {
              icon: "🚀",
              title: "Incubation Pathway",
              description:
                "Winning teams gain access to the NSBM Innovation Hub incubation program with resources and mentorship.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-lg border border-border bg-bg-card hover:border-accent-cyan/20 transition-all"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-text-primary text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
