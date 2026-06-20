/**
 * NeuroX email HTML templates.
 *
 * All templates share the same dark-branded wrapper with cyan accent (#00f0ff)
 * on a near-black background (#0a0a0f), matching the landing page aesthetic.
 */

// ---------------------------------------------------------------------------
// Shared layout
// ---------------------------------------------------------------------------

function wrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;text-align:center;">
              <img src="https://neurox.akashdesilva.space/neurox.webp" alt="NeuroX" width="200" height="84" style="display:block;margin:0 auto 12px;border:0;" />
              <p style="margin:8px 0 0;font-size:13px;color:#6b7280;font-family:'SF Mono',Fira Code,monospace;">
                AI HACKATHON &bull; JULY 2026 &bull; NSBM GREEN UNIVERSITY
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#11111b;border-radius:12px;padding:32px 40px;border:1px solid #1e293b;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
                <tr>
                  <td align="center" style="padding:0 24px;">
                    <img src="https://neurox.akashdesilva.space/nsbm.webp" alt="NSBM Green University" width="83" height="45" style="display:inline-block;margin:0 12px;border:0;vertical-align:middle;" />
                    <img src="https://neurox.akashdesilva.space/hackathonhub.webp" alt="NSBM Hackathon Hub" width="129" height="45" style="display:inline-block;margin:0 12px;border:0;vertical-align:middle;" />
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:12px;color:#6b7280;">
                NeuroX 2026 &bull; NSBM Green University, Sri Lanka
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">
                Questions? Reply to <a href="mailto:hh@nsbm.ac.lk" style="color:#00f0ff;text-decoration:none;">hh@nsbm.ac.lk</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const heading =
  'style="margin:0 0 12px;font-size:20px;font-weight:700;color:#e8e8ed;"';
const paragraph =
  'style="margin:0 0 16px;font-size:15px;color:#9ca3af;line-height:1.6;"';
const tokenBox =
  'style="display:block;margin:16px 0;padding:16px 20px;background-color:#0a0a0f;border:1px solid #00f0ff33;border-radius:8px;font-family:\'SF Mono\',Fira Code,monospace;font-size:18px;color:#00f0ff;text-align:center;letter-spacing:0.5px;word-break:break-all;"';
const ctaButton =
  'style="display:inline-block;margin:8px 0 16px;padding:12px 28px;background-color:#00f0ff;color:#0a0a0f;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;"';
const muted =
  'style="font-size:13px;color:#6b7280;margin:0 0 4px;"';
const listItem =
  'style="margin:0 0 8px;font-size:14px;color:#9ca3af;line-height:1.5;padding-left:16px;"';

// ---------------------------------------------------------------------------
// Registration + Welcome template
// ---------------------------------------------------------------------------

export interface RegistrationEmailData {
  teamName: string;
  memberName: string;
  submissionToken: string;
  isLeader?: boolean;
}

export function registrationEmail({
  teamName,
  memberName,
  submissionToken,
  isLeader,
}: RegistrationEmailData): { subject: string; html: string } {
  const subject = `Welcome to NeuroX 2026, ${teamName}!`;

  const body = `
<h2 ${heading}>You're registered${isLeader ? ", " + memberName : ""}!</h2>
<p ${paragraph}>
  <strong style="color:#e8e8ed;">${teamName}</strong> is now officially registered for NeuroX 2026 — a three-phase AI hackathon at NSBM Green University.
</p>
${isLeader ? `
<p ${paragraph}>
  <strong style="color:#00f0ff;">You are the team leader.</strong> The submission token below is your team's key to the project submission portal — keep it safe and share it with your teammates only if needed.
</p>` : ""}

<h3 style="margin:24px 0 8px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Your Submission Token</h3>
<p ${paragraph}>
  Use this token together with your team name to submit your project when the build phase begins.
</p>
<code ${tokenBox}>${submissionToken}</code>
${isLeader ? `
<p style="margin:8px 0 0;font-size:12px;color:#ef4444;font-family:'SF Mono',Fira Code,monospace;">
  &#x26A0; Keep this token safe! You will need it along with your team name to submit your project.
</p>` : ""}

<h3 style="margin:24px 0 8px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Event Timeline</h3>
<table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
  <tr>
    <td style="padding:4px 0;font-size:13px;color:#00f0ff;font-family:'SF Mono',Fira Code,monospace;padding-right:16px;vertical-align:top;">Phase 1</td>
    <td style="padding:4px 0;font-size:14px;color:#9ca3af;">Online Qualifier &mdash; submit your project idea</td>
  </tr>
  <tr>
    <td style="padding:4px 0;font-size:13px;color:#a855f7;font-family:'SF Mono',Fira Code,monospace;padding-right:16px;vertical-align:top;">Phase 2</td>
    <td style="padding:4px 0;font-size:14px;color:#9ca3af;">Remote Build &mdash; 10 days to build your prototype</td>
  </tr>
  <tr>
    <td style="padding:4px 0;font-size:13px;color:#3b82f6;font-family:'SF Mono',Fira Code,monospace;padding-right:16px;vertical-align:top;">Phase 3</td>
    <td style="padding:4px 0;font-size:14px;color:#9ca3af;">Grand Finale &mdash; live demos at NSBM, July 26&ndash;28</td>
  </tr>
</table>

<h3 style="margin:24px 0 8px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Next Steps</h3>
<p ${listItem}>&#x25B8; Watch for the qualifier kick-off email with your challenge brief.</p>
<p ${listItem}>&#x25B8; Your submission token above is your key to the project submission portal.</p>
<p ${listItem}>&#x25B8; Visit <a href="https://neurox.akashdesilva.space/projects" style="color:#00f0ff;text-decoration:none;">neurox.akashdesilva.space/projects</a> to explore the gallery once projects go live.</p>
<p ${listItem}>&#x25B8; Download the <a href="https://www.canva.com/design/DAHNACHaUbU/rHvo8qEfzDE07KCdEYfX-Q/view" style="color:#00f0ff;text-decoration:none;">Delegate Booklet</a> for full event details, schedule, and guidelines.</p>

<p ${paragraph} style="margin-top:24px;">
  Good luck &mdash; see you at the finale!<br/>
  <span ${muted}>&mdash; The NeuroX Team</span>
</p>`;

  return { subject, html: wrapper(subject, body) };
}

// ---------------------------------------------------------------------------
// Project submission confirmation template
// ---------------------------------------------------------------------------

export interface SubmissionEmailData {
  teamName: string;
  memberName: string;
  projectName: string;
  projectTagline: string;
  projectId: string;
  projectUrl: string;
}

export function submissionConfirmationEmail({
  teamName,
  memberName,
  projectName,
  projectTagline,
  projectUrl,
}: SubmissionEmailData): { subject: string; html: string } {
  const subject = `Project "${projectName}" submitted — NeuroX 2026`;

  const body = `
<h2 ${heading}>Project submitted, ${memberName}!</h2>
<p ${paragraph}>
  <strong style="color:#e8e8ed;">${teamName}</strong> has successfully submitted <strong style="color:#e8e8ed;">${projectName}</strong> to the NeuroX 2026 project gallery.
</p>

<div style="margin:20px 0;padding:16px 20px;background-color:#0a0a0f;border-left:3px solid #00f0ff;border-radius:0 8px 8px 0;">
  <p style="margin:0 0 4px;font-size:17px;font-weight:700;color:#e8e8ed;">${projectName}</p>
  <p style="margin:0;font-size:14px;color:#9ca3af;">${projectTagline}</p>
</div>

<table cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td align="center" style="padding:16px 0 24px;">
      <a href="${projectUrl}" ${ctaButton}>View Your Project</a>
    </td>
  </tr>
</table>

<h3 style="margin:24px 0 8px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">What Happens Next?</h3>
<p ${listItem}>&#x25B8; Your project is now visible in the <a href="https://neurox.akashdesilva.space/projects" style="color:#00f0ff;text-decoration:none;">NeuroX gallery</a> for community voting.</p>
<p ${listItem}>&#x25B8; Judges will evaluate submissions based on innovation, technical execution, and impact.</p>
<p ${listItem}>&#x25B8; Top 10 teams will be invited to the Grand Finale at NSBM Green University (July 26&ndash;28).</p>
<p ${listItem}>&#x25B8; Finalists will be announced via email &mdash; keep an eye on your inbox!</p>
<p ${listItem}>&#x25B8; Download the <a href="https://www.canva.com/design/DAHNACHaUbU/rHvo8qEfzDE07KCdEYfX-Q/view" style="color:#00f0ff;text-decoration:none;">Delegate Booklet</a> for full event details, schedule, and guidelines.</p>

<p ${paragraph} style="margin-top:24px;">
  Great work &mdash; we're excited to see what you built!<br/>
  <span ${muted}>&mdash; The NeuroX Team</span>
</p>`;

  return { subject, html: wrapper(subject, body) };
}
