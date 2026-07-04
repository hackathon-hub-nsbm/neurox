import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — NeuroX",
  description: "Privacy policy for NeuroX hackathon",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-text-dim mb-10">
          Last updated: July 2026
        </p>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Data we collect
            </h2>
            <p>
              When you register for NeuroX, we collect the team name, university
              affiliation, and the name and email address of each team member
              (3–4 members per team). When you submit a project, we collect
              project details including name, description, technologies used,
              and uploaded screenshots.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              How we use your data
            </h2>
            <p>
              Your data is used exclusively for hackathon administration:
              confirming registrations, sending event-related email
              notifications (phase reminders, submission confirmations), and
              displaying submitted projects in the public project gallery. Team
              member names appear publicly on project pages. Email addresses are
              never displayed publicly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Third-party services
            </h2>
            <p>
              We use Supabase (database and file storage) and Resend
              (transactional email). Your data is stored on Supabase servers
              and emails are sent through Resend. Both providers have their own
              privacy policies and data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Cookies
            </h2>
            <p>
              This site uses only essential HttpOnly cookies for team
              authentication when submitting projects. No tracking cookies,
              analytics cookies, or third-party cookies are used. No cookie
              consent is required under applicable regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Data retention
            </h2>
            <p>
              Registration and project data is retained for the duration of the
              hackathon event and a reasonable period afterward for archival and
              certificate issuance purposes. You may request deletion of your
              data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Contact
            </h2>
            <p>
              For privacy-related inquiries, contact us at{" "}
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
