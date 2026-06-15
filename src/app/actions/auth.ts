"use server";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { setTeamCookie, clearTeamCookie } from "@/lib/auth";

export interface AuthState {
  success: boolean;
  message: string;
  teamName?: string;
}

/**
 * Verifies a team's access using their team name and submission token.
 * On success, sets an HttpOnly signed cookie for subsequent authenticated requests.
 */
export async function verifyTeamAccess(
  teamName: string,
  token: string
): Promise<AuthState> {
  if (!teamName || !token) {
    return {
      success: false,
      message: "Team name and submission token are required.",
    };
  }

  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select("id, team_name, submission_token")
    .eq("team_name", teamName)
    .single();

  if (error || !data) {
    return {
      success: false,
      message: "Team not found. Check your team name and try again.",
    };
  }

  // Compare tokens (case-insensitive for UUIDs)
  if (
    data.submission_token.toLowerCase() !== token.toLowerCase()
  ) {
    return {
      success: false,
      message: "Invalid submission token. Please check and try again.",
    };
  }

  // Set the signed cookie
  await setTeamCookie(data.id, data.team_name);

  return {
    success: true,
    message: `Welcome back, ${data.team_name}! You can now submit your project.`,
    teamName: data.team_name,
  };
}

/**
 * Clears the team access cookie.
 */
export async function logoutTeam(): Promise<void> {
  await clearTeamCookie();
}
