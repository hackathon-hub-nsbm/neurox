"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

interface ToggleVoteResult {
  success: boolean;
  newCount: number;
  didVote: boolean;
  message?: string;
}

/**
 * Toggles a vote for a project. Uses a client-provided voterId
 * stored in localStorage to prevent double-voting without auth.
 */
export async function toggleVote(
  projectId: string,
  voterId: string
): Promise<ToggleVoteResult> {
  if (!projectId || !voterId) {
    return { success: false, newCount: 0, didVote: false, message: "Missing parameters." };
  }

  const supabase = createSupabaseServerClient();

  // Check if vote exists
  const { data: existing } = await supabase
    .from("votes")
    .select("id")
    .eq("project_id", projectId)
    .eq("voter_id", voterId)
    .single();

  if (existing) {
    // Un-vote: delete
    const { error: deleteError } = await supabase
      .from("votes")
      .delete()
      .eq("project_id", projectId)
      .eq("voter_id", voterId);

    if (deleteError) {
      console.error("Vote delete error:", deleteError);
      return { success: false, newCount: 0, didVote: true, message: "Failed to remove vote." };
    }
  } else {
    // Vote: insert
    const { error: insertError } = await supabase
      .from("votes")
      .insert({ project_id: projectId, voter_id: voterId });

    if (insertError) {
      if (insertError.code === "23505") {
        // Unique violation — already voted (race condition)
        return { success: true, newCount: 0, didVote: true };
      }
      console.error("Vote insert error:", insertError);
      return { success: false, newCount: 0, didVote: false, message: "Failed to record vote." };
    }
  }

  // Get new count
  const { count, error: countError } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);

  if (countError) {
    console.error("Vote count error:", countError);
  }

  return {
    success: true,
    newCount: count ?? 0,
    didVote: !existing,
  };
}
