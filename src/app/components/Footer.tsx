import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/neurox.webp"
              alt="NeuroX"
              width={200}
              height={40}
              className="h-10 w-auto mb-3"
            />
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              A three-phase AI hackathon organized by NSBM Hackathon Hub.
              Empowering Sri Lankan undergraduates to innovate at the
              intersection of artificial intelligence and real-world
              problem-solving.
            </p>
            <p
              className="text-xs text-text-dim"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Built with neural enthusiasm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-text-primary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#about", label: "About" },
                { href: "#timeline", label: "Timeline" },
                { href: "#eligibility", label: "Eligibility" },
                { href: "#criteria", label: "Criteria" },
                { href: "#prizes", label: "Prizes" },
                { href: "#register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hackathonhub@nsbm.ac.lk"
                  className="text-sm text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  hackathonhub@nsbm.ac.lk
                </a>
              </li>
              <li>
                <Image
                  src="/nsbm.webp"
                  alt="NSBM Green University"
                  width={160}
                  height={40}
                  className="h-10 w-auto mt-1"
                />
              </li>
              <li>
                <span className="text-sm text-text-secondary">
                  Mahenwaththa, Pitipana
                </span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Homagama</span>
              </li>
            </ul>
          </div>

          {/* Organizer */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-text-primary mb-4">
              Organized By
            </h4>
            <Image
              src="/hackathonhub.webp"
              alt="NSBM Hackathon Hub"
              width={160}
              height={40}
              className="h-10 w-auto mb-2"
            />
            <p className="text-sm text-text-secondary leading-relaxed">
              NSBM Green University&apos;s premier innovation and hackathon
              community, fostering technical excellence and creative
              problem-solving among Sri Lankan undergraduates.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-dim">
            &copy; {new Date().getFullYear()} NSBM Hackathon Hub. All rights
            reserved.
          </p>
          <p
            className="text-xs text-text-dim"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            NeuroX v1.0 — July 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
