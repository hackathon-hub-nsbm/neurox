interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="relative mb-12 md:mb-16">
      {/* Number watermark */}
      <span
        className="absolute -top-8 left-0 text-[6rem] md:text-[8rem] font-bold leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-geist-mono)",
          color: "var(--color-accent-cyan)",
          opacity: 0.04,
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Title */}
      <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-cyan tracking-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="mt-3 text-text-secondary text-sm md:text-base max-w-2xl"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <span className="text-accent-cyan mr-2">&gt;</span>
          {subtitle}
        </p>
      )}
    </div>
  );
}
