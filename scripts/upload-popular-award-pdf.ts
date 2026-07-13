/**
 * One-time script: Upload Popular Award guidelines PDF to Supabase Storage.
 *
 * Usage: bun run scripts/upload-popular-award-pdf.ts
 *
 * Loads credentials from .env.local (same pattern as export-registrations.ts).
 * Uploads to the existing public project-assets bucket.
 */

import { createClient } from "@supabase/supabase-js";
import * as path from "node:path";

const PDF_PATH = "/home/irwtn/Downloads/Popular Award.pdf";
const BUCKET = "project-assets";
const STORAGE_PATH = "awards/popular-choice-guidelines.pdf";

// ---------------------------------------------------------------------------
// Env loading (mirrors export-registrations.ts)
// ---------------------------------------------------------------------------

async function loadEnvLocal(): Promise<void> {
  const envPath = path.resolve(import.meta.dir, "..", ".env.local");
  const file = Bun.file(envPath);

  if (!(await file.exists())) {
    console.warn("⚠  .env.local not found — relying on process environment only.");
    return;
  }

  const content = await file.text();
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;

    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(
      `\n❌ Missing required environment variable: ${name}\n\n` +
        `Add it to .env.local or set it in the environment.`
    );
    process.exit(1);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

async function main() {
  await loadEnvLocal();

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient(url, key);

  console.log(`Reading PDF from: ${PDF_PATH}`);
  const fileBuffer = await Bun.file(PDF_PATH).arrayBuffer();
  console.log(`File size: ${(fileBuffer.byteLength / (1024 * 1024)).toFixed(1)} MB`);

  console.log(`Uploading to: ${BUCKET}/${STORAGE_PATH}`);
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(STORAGE_PATH, fileBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    console.error("Upload failed:", error);
    process.exit(1);
  }

  console.log("✅ Upload successful!");
  console.log(`Public URL: ${url}/storage/v1/object/public/${BUCKET}/${STORAGE_PATH}`);
}

main();
