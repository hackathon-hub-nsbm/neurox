import { createClient } from "@supabase/supabase-js";
import ExcelJS from "exceljs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TeamMember {
  name: string;
  email: string;
}

interface Registration {
  id: string;
  team_name: string;
  university: string;
  project_idea: string;
  members: TeamMember[];
  submitted_at: string;
}

interface FlattenedRow {
  id: string;
  team_name: string;
  university: string;
  project_idea: string;
  member_1_name: string;
  member_1_email: string;
  member_2_name: string;
  member_2_email: string;
  member_3_name: string;
  member_3_email: string;
  member_4_name: string;
  member_4_email: string;
  submitted_at: string;
}

const MAX_MEMBERS = 4;

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

/**
 * Load key=value pairs from `.env.local` if it exists.
 * Respects already-set env vars (command-line wins over .env.local).
 */
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

    // Don't override vars already set in the environment
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
        `Add it to .env.local:\n` +
        `  ${name}=<your-value>\n\n` +
        `For SUPABASE_SERVICE_ROLE_KEY, get it from:\n` +
        `  Supabase Dashboard → Project Settings → API → service_role (secret)\n` +
        `  https://supabase.com/dashboard/project/wljniiaolxpjnlrfxutn/settings/api\n`,
    );
    process.exit(1);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchRegistrations(): Promise<Registration[]> {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("submitted_at", { ascending: true });

  if (error) {
    console.error(`❌ Failed to fetch registrations: ${error.message}`);
    process.exit(1);
  }

  return (data ?? []) as Registration[];
}

// ---------------------------------------------------------------------------
// Flatten members JSONB into fixed columns
// ---------------------------------------------------------------------------

function flattenRow(r: Registration): FlattenedRow {
  const row: FlattenedRow = {
    id: r.id,
    team_name: r.team_name,
    university: r.university,
    project_idea: r.project_idea,
    member_1_name: "",
    member_1_email: "",
    member_2_name: "",
    member_2_email: "",
    member_3_name: "",
    member_3_email: "",
    member_4_name: "",
    member_4_email: "",
    submitted_at: formatDate(r.submitted_at),
  };

  const members = Array.isArray(r.members) ? r.members : [];

  for (let i = 0; i < MAX_MEMBERS; i++) {
    const m = members[i];
    if (m && typeof m.name === "string" && typeof m.email === "string") {
      (row as Record<string, string>)[`member_${i + 1}_name`] = m.name;
      (row as Record<string, string>)[`member_${i + 1}_email`] = m.email;
    }
  }

  return row;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

// ---------------------------------------------------------------------------
// Excel generation
// ---------------------------------------------------------------------------

const HEADERS: { key: keyof FlattenedRow; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "team_name", label: "Team Name" },
  { key: "university", label: "University" },
  { key: "project_idea", label: "Project Idea" },
  { key: "member_1_name", label: "Member 1 Name" },
  { key: "member_1_email", label: "Member 1 Email" },
  { key: "member_2_name", label: "Member 2 Name" },
  { key: "member_2_email", label: "Member 2 Email" },
  { key: "member_3_name", label: "Member 3 Name" },
  { key: "member_3_email", label: "Member 3 Email" },
  { key: "member_4_name", label: "Member 4 Name" },
  { key: "member_4_email", label: "Member 4 Email" },
  { key: "submitted_at", label: "Submitted At" },
];

async function buildWorkbook(rows: FlattenedRow[]): Promise<ExcelJS.Workbook> {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Registrations");

  // Header row
  const headerRow = ws.addRow(HEADERS.map((h) => h.label));
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E7FF" }, // light blue
  };
  headerRow.alignment = { vertical: "middle", horizontal: "left" };

  // Data rows
  for (const row of rows) {
    ws.addRow(HEADERS.map((h) => row[h.key]));
  }

  // Freeze header row
  ws.views = [{ state: "frozen", ySplit: 1 }];

  // Auto-width columns
  ws.columns = HEADERS.map((h) => ({
    header: h.label,
    key: h.key,
    width: Math.max(
      h.label.length + 4,
      ...rows.map((r) => String(r[h.key]).length + 2),
    ),
  }));

  return wb;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("📋 Fetching registrations from Supabase…");
  const registrations = await fetchRegistrations();

  if (registrations.length === 0) {
    console.log("ℹ️  No registrations found. Generating empty spreadsheet.");
  } else {
    console.log(`✅ ${registrations.length} registration(s) fetched.`);
  }

  const flat = registrations.map(flattenRow);
  const workbook = await buildWorkbook(flat);

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const outPath = path.resolve(
    import.meta.dir,
    "..",
    `neurox-registrations-${today}.xlsx`,
  );

  await workbook.xlsx.writeFile(outPath);
  console.log(`📁 Exported to ${outPath}`);
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
