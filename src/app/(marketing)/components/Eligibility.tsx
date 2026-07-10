import SectionHeading from "./SectionHeading";

const criteria = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    title: "Sri Lankan Undergraduates",
    description:
      "Open to all currently enrolled undergraduate students at any recognized Sri Lankan university or higher education institute.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    title: "Teams of 3–4 Members",
    description:
      "Form a team with 3 to 4 members. Cross-disciplinary teams are highly encouraged — diversity of skills leads to stronger solutions.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>
    ),
    title: "All Disciplines Welcome",
    description:
      "No restrictions on field of study. Teams must include at least one member with basic programming proficiency to handle technical implementation.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: "Full Availability",
    description:
      "All team members must commit to the full three-phase schedule. Incomplete participation may result in disqualification.",
  },
];

export default function Eligibility() {
  return (
    <section id="eligibility" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="03"
          title="Who can participate?"
          subtitle="Review the participation requirements"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {criteria.map((item, i) => (
            <div
              key={item.title}
              className={`group p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.06)] ${
                i === 0
                  ? "lg:col-span-2 border border-border bg-bg-card hover:border-accent-cyan/30"
                  : i % 2 === 0
                    ? "border border-border bg-bg-card hover:border-accent-cyan/30"
                    : "card-flat hover:border-accent-cyan/20"
              }`}
            >
              <div className="w-10 h-10 rounded-md bg-bg-tertiary border border-border flex items-center justify-center text-accent-cyan mb-4 group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-all">
                {item.icon}
              </div>
              <h3 className="font-semibold text-text-primary mb-2 text-sm md:text-base">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-8 p-6 rounded-lg border border-accent-cyan/20 bg-accent-cyan/[0.03]">
          <div
            className="flex items-start gap-3"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <span className="text-accent-cyan text-lg shrink-0">ℹ</span>
            <div>
              <p className="text-sm text-accent-cyan font-semibold mb-1">
                Not sure if you qualify?
              </p>
              <p className="text-sm text-text-secondary">
                To have been eligible, you must be an undergraduate at a recognized Sri Lankan
                institution and have formed a team of 3–4.
                Enrollment status has been confirmed for all registered teams.
                Reach us at{" "}
                <a
                  href="mailto:hh@nsbm.ac.lk"
                  className="text-accent-cyan hover:underline"
                >
                  hh@nsbm.ac.lk
                </a>{" "}
                with questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
