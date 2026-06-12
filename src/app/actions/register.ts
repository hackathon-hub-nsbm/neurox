"use server";

import { refresh } from "next/cache";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// --- Types ---

interface TeamMember {
  name: string;
  email: string;
}

interface Registration {
  id: string;
  teamName: string;
  members: TeamMember[];
  university: string;
  projectIdea: string;
  submittedAt: string;
}

export interface RegisterState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  teamName?: string;
}

// --- Validation ---

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(
  formData: FormData
): { valid: false; errors: Record<string, string> } | { valid: true } {
  const errors: Record<string, string> = {};

  const teamName = formData.get("teamName") as string;
  if (!teamName || teamName.trim().length < 2) {
    errors.teamName = "Team name must be at least 2 characters.";
  }

  const university = formData.get("university") as string;
  if (!university || university.trim().length < 3) {
    errors.university = "University name is required.";
  }

  const projectIdea = formData.get("projectIdea") as string;
  if (!projectIdea || projectIdea.trim().length < 50) {
    errors.projectIdea =
      "Project idea must be at least 50 characters to give a meaningful overview.";
  }

  // Validate team members
  const members: TeamMember[] = [];
  for (let i = 1; i <= 4; i++) {
    const name = (formData.get(`memberName${i}`) as string)?.trim();
    const email = (formData.get(`memberEmail${i}`) as string)?.trim();

    if (name || email) {
      if (!name) {
        errors[`memberName${i}`] = `Member ${i} name is required if email is provided.`;
      }
      if (!email) {
        errors[`memberEmail${i}`] = `Member ${i} email is required if name is provided.`;
      }
      if (email && !validateEmail(email)) {
        errors[`memberEmail${i}`] = `Member ${i}: Please enter a valid email address.`;
      }
      if (name && email && validateEmail(email)) {
        members.push({ name, email });
      }
    }
  }

  if (members.length < 3) {
    errors.members = `At least 3 team members are required. You have provided ${members.length}.`;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
}

// --- Server Action ---

export async function registerTeam(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // 1. Validate
  const validation = validate(formData);
  if (!validation.valid) {
    return {
      success: false,
      message: "Please fix the errors below and try again.",
      errors: validation.errors,
    };
  }

  // 2. Build registration object
  const teamName = (formData.get("teamName") as string).trim();
  const university = (formData.get("university") as string).trim();
  const projectIdea = (formData.get("projectIdea") as string).trim();

  const members: TeamMember[] = [];
  for (let i = 1; i <= 4; i++) {
    const name = (formData.get(`memberName${i}`) as string)?.trim();
    const email = (formData.get(`memberEmail${i}`) as string)?.trim();
    if (name && email) {
      members.push({ name, email });
    }
  }

  const registration: Registration = {
    id: crypto.randomUUID(),
    teamName,
    members,
    university,
    projectIdea,
    submittedAt: new Date().toISOString(),
  };

  // 3. Read existing registrations
  const filePath = path.join(process.cwd(), "src", "data", "registrations.json");
  let registrations: Registration[] = [];
  try {
    const raw = await readFile(filePath, "utf-8");
    registrations = JSON.parse(raw);
    if (!Array.isArray(registrations)) registrations = [];
  } catch {
    registrations = [];
  }

  // 4. Append and write
  registrations.push(registration);
  await writeFile(filePath, JSON.stringify(registrations, null, 2), "utf-8");

  // 5. Refresh cache
  refresh();

  return {
    success: true,
    message: `Team "${teamName}" registered successfully! Check your emails for Phase 1 instructions.`,
    teamName,
  };
}
