/**
 * NeuroX email HTML templates.
 *
 * Dark cyberpunk aesthetic matching the landing page — neon cyan (#00f0ff)
 * accents, purple-tinted card surfaces, 64px grid background, glow borders,
 * monospace metadata. All styles are inline (email-safe), colors are hardcoded
 * hex values, and layout uses <table> for maximum client compatibility.
 */

// ---------------------------------------------------------------------------
// Shared design tokens (hardcoded — no CSS variables in email)
// ---------------------------------------------------------------------------

const C = {
  bg: "#0a0a0f",
  bgCard: "#11111b",
  bgElevated: "#16162a",
  accent: "#00f0ff",
  accentDim: "#00f0ff22",
  blue: "#4a6a8a",
  purple: "#6a5a8a",
  pink: "#8a5a6a",
  text: "#e8e8ed",
  textSecondary: "#9ca3af",
  textDim: "#6b7280",
  border: "#1e293b",
  borderGlow: "#00f0ff33",
  success: "#22c55e",
  error: "#ef4444",
} as const;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://neurox.akashdesilva.space";

// Mini 64px grid as a base64 SVG data-URI. A single 64×64 SVG with 1px
// semi-transparent cyan lines at the left and top edges, tiled via CSS.
const GRID_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">` +
      `<rect width="64" height="64" fill="${C.bg}"/>` +
      `<line x1="0" y1="0" x2="64" y2="0" stroke="${C.accent}" stroke-opacity="0.03" stroke-width="1"/>` +
      `<line x1="0" y1="0" x2="0" y2="64" stroke="${C.accent}" stroke-opacity="0.03" stroke-width="1"/>` +
      `</svg>`
  );

// ---------------------------------------------------------------------------
// Reusable inline style strings
// ---------------------------------------------------------------------------

const heading =
  `font-size:20px;font-weight:700;color:${C.text};margin:0 0 12px;`;

const subheading =
  `font-size:13px;color:${C.textDim};text-transform:uppercase;letter-spacing:1.5px;` +
  `font-family:'Courier New',Courier,monospace;margin:0 0 16px;`;

const paragraph =
  `font-size:15px;color:${C.textSecondary};line-height:1.7;margin:0 0 14px;`;

const monoLabel =
  `font-family:'Courier New',Courier,monospace;font-size:12px;` +
  `text-transform:uppercase;letter-spacing:1px;`;

// Glow-border token box: a nested two-cell table. The outer cell has a
// cyan→purple→blue gradient background; the inner cell has the bg color
// with 1.5px padding, leaving the gradient visible as a 1.5px "border".
function glowBorderCell(inner: string): string {
  return `
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0;">
      <tr>
        <td style="padding:2px;border-radius:8px;background:linear-gradient(135deg,${C.accent},rgba(0,240,255,0.6),rgba(0,240,255,0.3),${C.accent});background-size:300% 300%;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:20px 24px;background-color:${C.bg};border-radius:6px;">
                ${inner}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

// Gradient CTA button
function ctaButton(label: string, href: string): string {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:24px 0 8px;">
      <tr>
        <td align="center" style="border-radius:8px;background:linear-gradient(135deg,${C.accent},rgba(0,240,255,0.7));box-shadow:0 0 20px ${C.accentDim};">
          <a href="${href}" style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:700;color:${C.bg};text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

// Badge pill — used for phase labels
function badge(label: string, color: string): string {
  return `<span style="display:inline-block;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:700;color:${C.bg};background:${color};${monoLabel}letter-spacing:0.5px;">${label}</span>`;
}

// ---------------------------------------------------------------------------
// Shared layout wrapper
// ---------------------------------------------------------------------------

function wrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};background-image:url('${GRID_SVG}');background-repeat:repeat;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:transparent;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Main container — 600px max -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- ===== TOP ACCENT BAR ===== -->
          <tr>
            <td style="height:4px;border-radius:4px 4px 0 0;background:linear-gradient(90deg,${C.accent},rgba(0,240,255,0.5),rgba(0,240,255,0.2),${C.accent});background-size:200% 100%;"></td>
          </tr>

          <!-- ===== HEADER ===== -->
          <tr>
            <td style="padding:36px 40px 20px;text-align:center;background-color:${C.bgCard};border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
              <img
                src="${BASE_URL}/neurox.webp"
                alt="NeuroX"
                width="180"
                height="76"
                style="display:block;margin:0 auto 12px;border:0;"
              />
              <p style="margin:0;${monoLabel}color:${C.accent};letter-spacing:2px;">
                AI HACKATHON &bull; JULY 2026
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:${C.textDim};${monoLabel}">
                NSBM GREEN UNIVERSITY &bull; SRI LANKA
              </p>

              <!-- Glowing divider -->
              <table cellpadding="0" cellspacing="0" width="80" style="margin:20px auto 0;">
                <tr>
                  <td style="height:1px;background:linear-gradient(90deg,transparent,${C.accent},transparent);"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== BODY ===== -->
          <tr>
            <td style="padding:36px 40px;background-color:${C.bgCard};border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
              ${body}
            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="padding:32px 40px 28px;background-color:${C.bgCard};border-left:1px solid ${C.border};border-right:1px solid ${C.border};border-bottom:1px solid ${C.border};border-radius:0 0 12px 12px;text-align:center;">

              <!-- Logos row -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td align="center" style="padding:12px 0;">
                    <img src="${BASE_URL}/nsbm.webp" alt="NSBM Green University" width="75" height="40" style="display:inline-block;margin:0 14px;border:0;vertical-align:middle;" />
                    <img src="${BASE_URL}/hackathonhub.webp" alt="NSBM Hackathon Hub" width="118" height="40" style="display:inline-block;margin:0 14px;border:0;vertical-align:middle;" />
                    <img src="${BASE_URL}/neurox.webp" alt="NeuroX" width="100" height="40" style="display:inline-block;margin:0 14px;border:0;vertical-align:middle;" />
                  </td>
                </tr>
              </table>

              <!-- Event info -->
              <p style="margin:0 0 8px;font-size:13px;color:${C.textSecondary};">
                NeuroX 2026 &bull; NSBM Green University, Sri Lanka
              </p>
              <p style="margin:0 0 16px;font-size:12px;color:${C.textDim};">
                July 26&ndash;28, 2026 &bull; Three-phase AI Hackathon
              </p>

              <!-- Links -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="padding:0 12px;">
                    <a href="${BASE_URL}/projects" style="font-size:12px;color:${C.accent};text-decoration:none;${monoLabel}">Gallery</a>
                  </td>
                  <td style="padding:0 12px;">
                    <a href="https://www.canva.com/design/DAHNACHaUbU/rHvo8qEfzDE07KCdEYfX-Q/view" style="font-size:12px;color:${C.accent};text-decoration:none;${monoLabel}">Delegate Booklet</a>
                  </td>
                  <td style="padding:0 12px;">
                    <a href="mailto:hh@nsbm.ac.lk" style="font-size:12px;color:${C.accent};text-decoration:none;${monoLabel}">Contact</a>
                  </td>
                </tr>
              </table>

              <!-- Bottom bar -->
              <table cellpadding="0" cellspacing="0" width="60" style="margin:0 auto 12px;">
                <tr>
                  <td style="height:1px;background:linear-gradient(90deg,transparent,${C.accentDim},transparent);"></td>
                </tr>
              </table>
              <p style="margin:0;font-size:11px;color:${C.textDim};${monoLabel}letter-spacing:0.5px;">
                Built with neural enthusiasm.
              </p>
            </td>
          </tr>

        </table>

        <!-- Legal footnote (outside the card) -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin-top:16px;">
          <tr>
            <td style="padding:0 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:${C.textDim};line-height:1.5;">
                You received this email because your team registered for NeuroX 2026.<br/>
                Questions? Reply to <a href="mailto:hh@nsbm.ac.lk" style="color:${C.accent};text-decoration:none;">hh@nsbm.ac.lk</a>
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
    <!-- Welcome heading -->
    <h2 style="${heading}">
      You're in<span style="color:${C.accent};">.</span>
    </h2>
    <p style="${subheading}">
      Registration confirmed &mdash; ${teamName}
    </p>

    <p style="${paragraph}">
      <strong style="color:${C.text};">${teamName}</strong> is now officially registered for NeuroX 2026 — a three-phase AI hackathon at NSBM Green University, Sri Lanka.
    </p>

    ${isLeader ? `
    <!-- Leader callout -->
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0;background-color:${C.bgElevated};border-radius:8px;border-left:3px solid ${C.accent};">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 4px;${monoLabel}color:${C.accent};">Team Leader</p>
          <p style="margin:0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
            <strong style="color:${C.text};">${memberName}</strong>, you are the team leader. The submission token below is your team's key to the project portal — keep it safe. Share it with teammates only if needed.
          </p>
        </td>
      </tr>
    </table>
    ` : `
    <p style="${paragraph}">
      <strong style="color:${C.text};">${memberName}</strong> — your team leader holds the submission token. Reach out to them when it's time to submit your project.
    </p>
    `}

    <!-- Submission Token -->
    <h3 style="margin:28px 0 4px;${monoLabel}color:${C.textDim};">Submission Token</h3>
    <p style="margin:0 0 4px;font-size:13px;color:${C.textDim};">
      Use this token together with your team name when submitting your project.
    </p>
    ${glowBorderCell(`
      <code style="display:block;font-family:'Courier New',Courier,monospace;font-size:20px;color:${C.accent};text-align:center;letter-spacing:1px;word-break:break-all;">
        ${submissionToken}
      </code>
    `)}
    ${isLeader ? `
    <p style="margin:4px 0 0;font-size:12px;color:${C.error};${monoLabel}">
      &#x26A0; Keep this token safe. You need it + your team name to submit.
    </p>` : ""}

    <!-- Event Timeline -->
    <h3 style="margin:32px 0 12px;${monoLabel}color:${C.textDim};">Event Timeline</h3>
    <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
      <tr>
        <td style="padding:10px 14px;background-color:${C.bgElevated};border-radius:6px 6px 0 0;border-bottom:1px solid ${C.border};">
          ${badge("PHASE 1", C.accent)}
          <span style="font-size:14px;color:${C.text};margin-left:10px;">Online Qualifier</span>
          <span style="float:right;font-size:12px;color:${C.textDim};">Submit your project idea</span>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 14px;background-color:${C.bgElevated};border-bottom:1px solid ${C.border};">
          ${badge("PHASE 2", C.purple)}
          <span style="font-size:14px;color:${C.text};margin-left:10px;">Remote Build</span>
          <span style="float:right;font-size:12px;color:${C.textDim};">10 days to build your prototype</span>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 14px;background-color:${C.bgElevated};border-radius:0 0 6px 6px;">
          ${badge("PHASE 3", C.blue)}
          <span style="font-size:14px;color:${C.text};margin-left:10px;">Grand Finale</span>
          <span style="float:right;font-size:12px;color:${C.textDim};">Live demos at NSBM, July 26&ndash;28</span>
        </td>
      </tr>
    </table>

    <!-- Next Steps -->
    <h3 style="margin:28px 0 12px;${monoLabel}color:${C.textDim};">Next Steps</h3>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Watch for the qualifier kick-off email with your challenge brief.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Your submission token (above) is your key to the project portal.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Browse the <a href="${BASE_URL}/projects" style="color:${C.accent};text-decoration:underline;">project gallery</a> once submissions are live.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Download the <a href="https://www.canva.com/design/DAHNACHaUbU/rHvo8qEfzDE07KCdEYfX-Q/view" style="color:${C.accent};text-decoration:underline;">Delegate Booklet</a> for full event details.</span>
        </td>
      </tr>
    </table>

    ${ctaButton("Explore Project Gallery", "${BASE_URL}/projects")}

    <p style="margin-top:24px;${paragraph}">
      Good luck &mdash; see you at the finale<span style="color:${C.accent};">.</span><br/>
      <span style="font-size:13px;color:${C.textDim};">&mdash; The NeuroX Team</span>
    </p>`;

  return { subject, html: wrapper(subject, body) };
}

// ---------------------------------------------------------------------------
// Project submission confirmation template
// ---------------------------------------------------------------------------

export interface SubmissionConfirmationData {
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
  projectId,
  projectUrl,
}: SubmissionConfirmationData): { subject: string; html: string } {
  const subject = `Project submitted — ${projectName}`;

  const body = `
    <h2 style="${heading}">
      Project submitted<span style="color:${C.accent};">.</span>
    </h2>
    <p style="${subheading}">
      ${teamName} &mdash; your work is live
    </p>

    <p style="${paragraph}">
      <strong style="color:${C.text};">${memberName}</strong>, your team's project has been published to the NeuroX gallery.
    </p>

    <!-- Project callout card -->
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0;background-color:${C.bgElevated};border-radius:8px;border-left:3px solid ${C.accent};">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 4px;${monoLabel}color:${C.accent};">Project</p>
          <p style="margin:0 0 6px;font-size:18px;font-weight:700;color:${C.text};">
            ${projectName}
          </p>
          <p style="margin:0;font-size:14px;color:${C.textSecondary};line-height:1.5;">
            ${projectTagline}
          </p>
        </td>
      </tr>
    </table>

    ${ctaButton("View Your Project", projectUrl)}

    <h3 style="margin:28px 0 12px;${monoLabel}color:${C.textDim};">What's next?</h3>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Share your project link with friends and the community.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Browse and vote for other projects in the <a href="${BASE_URL}/projects" style="color:${C.accent};text-decoration:underline;">gallery</a>.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${C.textSecondary};line-height:1.6;">
          <span style="color:${C.accent};font-weight:700;">&#x25B8;</span>
          <span style="padding-left:8px;">Judges will review all submissions and finalists will be contacted.</span>
        </td>
      </tr>
    </table>

    <p style="margin-top:24px;${paragraph}">
      Good luck<span style="color:${C.accent};">.</span><br/>
      <span style="font-size:13px;color:${C.textDim};">&mdash; The NeuroX Team</span>
    </p>`;

  return { subject, html: wrapper(subject, body) };
}
