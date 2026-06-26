"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { registrationEmail } from "@/lib/email-templates";

// --- Types ---

interface TeamMember {
  name: string;
  email: string;
}

export interface RegisterState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  teamName?: string;
  submissionToken?: string;
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

  // 2. Extract validated data
  const teamName = (formData.get("teamName") as string).trim();
  const university = (formData.get("university") as string).trim();
  const members: TeamMember[] = [];
  for (let i = 1; i <= 4; i++) {
    const name = (formData.get(`memberName${i}`) as string)?.trim();
    const email = (formData.get(`memberEmail${i}`) as string)?.trim();
    if (name && email) {
      members.push({ name, email });
    }
  }

  // 3. Generate submission token and insert into Supabase
  const submissionToken = crypto.randomUUID();
  const supabase = createSupabaseServerClient();
  const { error: insertError } = await supabase.from("registrations").insert({
    team_name: teamName,
    university,
    members, // JSONB column — auto-serialized by supabase-js
    submission_token: submissionToken,
  });

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return {
      success: false,
      message: "Failed to register. Please try again or contact us at hh@nsbm.ac.lk.",
    };
  }

  // Send confirmation email to team leader only (fire-and-forget)
  const leader = members[0];
  if (leader) {
    const { subject, html } = registrationEmail({
      teamName,
      memberName: leader.name,
      submissionToken,
      isLeader: true,
    });
    try {
      await sendEmail({ to: leader.email, subject, html });
    } catch (err) {
      console.error("Failed to send registration email to", leader.email, err);
    }
  }

  return {
    success: true,
    message: `Team "${teamName}" registered successfully!`,
    teamName,
    submissionToken,
  };
}
