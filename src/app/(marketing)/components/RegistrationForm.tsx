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
      className="w-full py-3.5 px-6 rounded-lg bg-accent-cyan text-bg-primary font-semibold text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-[0.98] active:translate-y-px active:shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
  id?: string;
}

function FieldError({ error, id }: FieldErrorProps) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-error" style={{ fontFamily: "var(--font-geist-mono)" }}>
      {error}
    </p>
  );
}

function getErrorId(field: string, errors?: Record<string, string>): string | undefined {
  return errors?.[field] ? `${field}-error` : undefined;
}

export default function RegistrationForm() {
  const [state, action] = useActionState(registerTeam, initialState);

  return (
    <section id="register" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          number="06"
          title="Register your team"
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
                <a
                  href="https://chat.whatsapp.com/KrkJBtqKzkLHOwuEmVFMrJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-accent-cyan/20 bg-accent-cyan/[0.05] text-sm text-accent-cyan hover:bg-accent-cyan/[0.1] hover:border-accent-cyan/40 transition-all"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join WhatsApp Community
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
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
              aria-describedby={getErrorId("teamName", state.errors)}
              aria-invalid={!!state.errors?.teamName}
              placeholder="e.g., Neural Knights"
              className="w-full px-4 py-3 rounded-lg border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
            />
            <FieldError error={state.errors?.teamName} id="teamName-error" />
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
                      aria-describedby={getErrorId(`memberName${i}`, state.errors)}
                      aria-invalid={!!state.errors?.[`memberName${i}`]}
                      placeholder={`Member ${i} full name`}
                      className="w-full px-3 py-2 rounded-md border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
                    />
                    <FieldError error={state.errors?.[`memberName${i}`]} id={`memberName${i}-error`} />
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
                      aria-describedby={getErrorId(`memberEmail${i}`, state.errors)}
                      aria-invalid={!!state.errors?.[`memberEmail${i}`]}
                      placeholder={`member${i}@example.com`}
                      className="w-full px-3 py-2 rounded-md border bg-bg-tertiary text-text-primary placeholder:text-text-dim focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
                    />
                    <FieldError error={state.errors?.[`memberEmail${i}`]} id={`memberEmail${i}-error`} />
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
            <select
              id="university"
              name="university"
              required
              defaultValue=""
              aria-describedby={getErrorId("university", state.errors)}
              aria-invalid={!!state.errors?.university}
              className="w-full px-4 py-3 rounded-lg border bg-bg-tertiary text-text-primary focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all outline-none text-sm"
            >
              <option value="" disabled>
                Select your university
              </option>
              <option value="University of Peradeniya">University of Peradeniya</option>
              <option value="University of Moratuwa">University of Moratuwa</option>
              <option value="University of Colombo School of Computing">University of Colombo School of Computing</option>
              <option value="Sri Lanka Institute of Information Technology">Sri Lanka Institute of Information Technology</option>
              <option value="University of Ruhuna">University of Ruhuna</option>
              <option value="Uva Wellassa University">Uva Wellassa University</option>
              <option value="Informatics Institute of Technology">Informatics Institute of Technology</option>
              <option value="Wayamba University of Sri Lanka">Wayamba University of Sri Lanka</option>
              <option value="General Sir John Kotelawala Defence University">General Sir John Kotelawala Defence University</option>
              <option value="Sabaragamuwa University of Sri Lanka">Sabaragamuwa University of Sri Lanka</option>
              <option value="Open University of Sri Lanka">Open University of Sri Lanka</option>
              <option value="University of Kelaniya">University of Kelaniya</option>
              <option value="University of Sri Jayewardenepura">University of Sri Jayewardenepura</option>
              <option value="Sri Lanka Technological Campus">Sri Lanka Technological Campus</option>
              <option value="Rajarata University of Sri Lanka">Rajarata University of Sri Lanka</option>
              <option value="University of Vavuniya">University of Vavuniya</option>
              <option value="University of Vocational Technology">University of Vocational Technology</option>
              <option value="University of Jaffna">University of Jaffna</option>
              <option value="South Eastern University of Sri Lanka">South Eastern University of Sri Lanka</option>
              <option value="National Institute of Business Management">National Institute of Business Management</option>
              <option value="National School of Business Management">National School of Business Management</option>
              <option value="CINEC Campus">CINEC Campus</option>
              <option value="Other">Other</option>
            </select>
            <FieldError error={state.errors?.university} id="university-error" />
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
