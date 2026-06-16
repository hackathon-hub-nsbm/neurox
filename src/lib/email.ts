import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL;

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Sends an email via Resend. Fire-and-forget — errors are logged but never thrown,
 * so email failures do not block the calling server action.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailParams): Promise<void> {
  if (!FROM) {
    console.warn(
      "RESEND_FROM_EMAIL is not set. Skipping email to",
      to,
      "with subject:",
      subject
    );
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend send error:", error);
    }
  } catch (err) {
    console.error("Resend unexpected error:", err);
  }
}
