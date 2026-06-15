import { cookies } from "next/headers";

const COOKIE_NAME = "nx-team";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export interface TeamCookie {
  registrationId: string;
  teamName: string;
}

function getSecret(): string {
  const secret = process.env.SUBMISSION_COOKIE_SECRET;
  if (!secret) {
    throw new Error("Missing SUBMISSION_COOKIE_SECRET environment variable.");
  }
  return secret;
}

/**
 * Creates an HMAC-SHA256 signature for the given payload.
 * Returns "payload.signature" as a single string.
 */
async function sign(payload: string): Promise<string> {
  const secret = getSecret();
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  const sigHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${payload}.${sigHex}`;
}

/**
 * Verifies an HMAC-SHA256 signature and returns the payload if valid.
 * Returns null if the signature is invalid or tampered with.
 */
async function unsign(signed: string): Promise<string | null> {
  const secret = getSecret();
  const encoder = new TextEncoder();

  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;

  const payload = signed.slice(0, lastDot);
  const signature = signed.slice(lastDot + 1);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison
  if (signature.length !== expectedHex.length) return null;
  let ok = 0;
  for (let i = 0; i < signature.length; i++) {
    ok |= signature.charCodeAt(i) ^ expectedHex.charCodeAt(i);
  }
  return ok === 0 ? payload : null;
}

/**
 * Sets an HttpOnly signed cookie containing team access info.
 */
export async function setTeamCookie(
  registrationId: string,
  teamName: string
): Promise<void> {
  const payload = JSON.stringify({
    registrationId,
    teamName,
    iat: Date.now(),
  });

  const signed = await sign(payload);
  const jar = await cookies();

  jar.set(COOKIE_NAME, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

/**
 * Reads and verifies the team access cookie.
 * Returns the team info if valid, null otherwise.
 */
export async function getTeamFromCookie(): Promise<TeamCookie | null> {
  const jar = await cookies();
  const cookie = jar.get(COOKIE_NAME);
  if (!cookie) return null;

  const payload = await unsign(cookie.value);
  if (!payload) return null;

  try {
    const data = JSON.parse(payload);
    // Check expiry (24h from issued-at)
    if (Date.now() - data.iat > COOKIE_MAX_AGE * 1000) return null;
    return { registrationId: data.registrationId, teamName: data.teamName };
  } catch {
    return null;
  }
}

/**
 * Removes the team access cookie (logout).
 */
export async function clearTeamCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
