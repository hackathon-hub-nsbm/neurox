import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 scanlines bg-bg-primary">
      <div className="text-center max-w-md">
        <Image
          src="/neurox.webp"
          alt="NeuroX"
          width={160}
          height={48}
          className="h-12 w-auto mx-auto mb-8 opacity-50"
        />
        <p
          className="text-8xl font-black text-text-primary/5 mb-4 select-none"
          style={{ fontFamily: "var(--font-geist-mono)" }}
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-accent-cyan text-bg-primary font-semibold text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-[0.98] active:translate-y-px"
          >
            Go home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-2.5 rounded-lg border border-border text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 text-sm uppercase tracking-widest transition-all active:scale-[0.98] active:translate-y-px"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
