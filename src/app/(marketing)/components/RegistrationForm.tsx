"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerTeam, type RegisterState } from "../actions/register";
import SectionHeading from "./SectionHeading";

const initialState: RegisterState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 px-6 rounded-lg bg-accent-cyan text-bg-primary font-semibold text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Registering...
        </>
      ) : (
        <>
          Submit Registration
          <svg
            className="w-4 h-4"
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
        </>
      )}
    </button>
  );
}

interface FieldErrorProps {
  error?: string;
}

function FieldError({ error }: FieldErrorProps) {
  if (!error) return null;
  return (
    <p className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
      {error}
    </p>
  );
}

export default function RegistrationForm() {
  const [state, action] = useActionState(registerTeam, initialState);

  return (
    <section id="register" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          number="06"
          title="Register Your Team"
          subtitle="Complete the form below to secure your spot in NeuroX 2026"
        />

        {/* Success state */}
        {state.success && (
          <div className="mb-8 p-6 rounded-lg border border-success/30 bg-success/[0.05]">
            <div className="flex items-start gap-3">
              <span className="text-success text-xl shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-success text-sm mb-1">
                  Registration Successful
                </h3>
                <p className="text-sm text-text-secondary">
                  {state.message} Your submission token has been sent to the team leader's email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* General error */}
        {!state.success && state.message && !state.errors && (
          <div className="mb-8 p-4 rounded-lg border border-error/30 bg-error/[0.05]">
            <p className="text-sm text-error">{state.message}</p>
          </div>
        )}

        <form action={action} className="space-y-8">
          {/* Team Name */}
          <div>
            <label
              htmlFor="teamName"
              className="block text-sm font-semibold text-text-primary mb-1.5"
            >
              Team Name <span className="text-accent-cyan">*</span>
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              required
              minLength={2}
              placeholder="e.g., Neural Knights"
              className="w-full px-4 py-3 rounded-lg border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
            />
            <FieldError error={state.errors?.teamName} />
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1.5">
              Team Members <span className="text-accent-cyan">*</span>
            </h3>
            <p className="text-xs text-text-dim mb-4">
              Enter 3–4 team members. The 4th member is optional.
            </p>
            <FieldError error={state.errors?.members} />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="grid sm:grid-cols-5 gap-3 p-4 rounded-lg border border-border bg-bg-card"
                >
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`memberName${i}`}
                      className="block text-xs text-text-secondary mb-1"
                    >
                      Name {i <= 3 ? "*" : "(optional)"}
                    </label>
                    <input
                      type="text"
                      id={`memberName${i}`}
                      name={`memberName${i}`}
                      required={i <= 3}
                      placeholder={`Member ${i} full name`}
                      className="w-full px-3 py-2 rounded-md border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
                    />
                    <FieldError error={state.errors?.[`memberName${i}`]} />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor={`memberEmail${i}`}
                      className="block text-xs text-text-secondary mb-1"
                    >
                      Email {i <= 3 ? "*" : "(optional)"}
                    </label>
                    <input
                      type="email"
                      id={`memberEmail${i}`}
                      name={`memberEmail${i}`}
                      required={i <= 3}
                      placeholder={`member${i}@example.com`}
                      className="w-full px-3 py-2 rounded-md border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
                    />
                    <FieldError error={state.errors?.[`memberEmail${i}`]} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* University */}
          <div>
            <label
              htmlFor="university"
              className="block text-sm font-semibold text-text-primary mb-1.5"
            >
              University / Institute <span className="text-accent-cyan">*</span>
            </label>
            <input
              type="text"
              id="university"
              name="university"
              required
              minLength={3}
              placeholder="e.g., NSBM Green University"
              className="w-full px-4 py-3 rounded-lg border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
            />
            <FieldError error={state.errors?.university} />
          </div>

          {/* Project Idea */}
          <div>
            <label
              htmlFor="projectIdea"
              className="block text-sm font-semibold text-text-primary mb-1.5"
            >
              Project Idea <span className="text-accent-cyan">*</span>
            </label>
            <p className="text-xs text-text-dim mb-2">
              Describe your proposed AI solution in at least 50 characters. What
              problem does it solve? How does it use AI/ML?
            </p>
            <textarea
              id="projectIdea"
              name="projectIdea"
              required
              minLength={50}
              rows={5}
              placeholder="Our project aims to..."
              className="w-full px-4 py-3 rounded-lg border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm resize-y"
            />
            <FieldError error={state.errors?.projectIdea} />
          </div>

          {/* Submit */}
          <SubmitButton />

          <p className="text-xs text-text-dim text-center mt-4">
            By registering, you agree that all team members are currently
            enrolled undergraduate students at a recognized Sri Lankan
            institution and can commit to the full event schedule.
          </p>
        </form>
      </div>
    </section>
  );
}
