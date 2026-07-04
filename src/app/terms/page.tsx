import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — NeuroX",
  description: "Terms of service for NeuroX hackathon",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary scanlines">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/"
          className="text-sm text-text-dim hover:text-accent-cyan transition-colors mb-8 inline-block"
        >
          ← Back to NeuroX
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-text-dim mb-10">
          Last updated: July 2026
        </p>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Eligibility
            </h2>
            <p>
              NeuroX is open to currently enrolled undergraduate students at
              recognized Sri Lankan universities and higher education
              institutions. Teams must consist of 3–4 members. All team members
              must commit to full participation across all three phases.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Code of conduct
            </h2>
            <p>
              All participants are expected to maintain a respectful,
              collaborative environment. Harassment, discrimination, or
              unsportsmanlike conduct will result in immediate
              disqualification. Projects must be original work created during
              the hackathon period. Use of pre-existing code must be clearly
              disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Intellectual property
            </h2>
            <p>
              Teams retain full ownership of their projects and intellectual
              property. By submitting a project, you grant NeuroX and NSBM
              Hackathon Hub a non-exclusive license to showcase your project
              on our website and promotional materials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Judging and prizes
            </h2>
            <p>
              All judging decisions are final. Prizes will be awarded as
              described on the event website. Prize amounts and categories
              are subject to change at the organizers&apos; discretion.
              Prize distribution will be coordinated with winning teams
              after the Grand Finale.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Liability
            </h2>
            <p>
              NSBM Hackathon Hub and NeuroX organizers are not liable for any
              damages, losses, or expenses arising from participation in the
              hackathon. Participants are responsible for their own equipment,
              travel arrangements, and any costs incurred during the event.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a
                href="mailto:hh@nsbm.ac.lk"
                className="text-accent-cyan hover:underline"
              >
                hh@nsbm.ac.lk
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
