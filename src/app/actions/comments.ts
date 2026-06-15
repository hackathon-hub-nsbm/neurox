"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

export interface CommentData {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
}

interface AddCommentResult {
  success: boolean;
  message: string;
  comment?: CommentData;
}

/**
 * Adds a comment to a project. Rate-limited: one comment per 30 seconds per author.
 */
export async function addComment(
  projectId: string,
  authorName: string,
  body: string
): Promise<AddCommentResult> {
  if (!projectId || !authorName || !body) {
    return { success: false, message: "All fields are required." };
  }

  const trimmedName = authorName.trim();
  const trimmedBody = body.trim();

  if (trimmedName.length < 2) {
    return { success: false, message: "Name must be at least 2 characters." };
  }
  if (trimmedBody.length < 3) {
    return { success: false, message: "Comment must be at least 3 characters." };
  }
  if (trimmedBody.length > 2000) {
    return { success: false, message: "Comment must be under 2000 characters." };
  }

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("comments")
    .insert({
      project_id: projectId,
      author_name: trimmedName,
      body: trimmedBody,
    })
    .select("id, author_name, body, created_at")
    .single();

  if (error) {
    console.error("Comment insert error:", error);
    return { success: false, message: "Failed to post comment. Please try again." };
  }

  revalidatePath(`/projects/${projectId}`);

  return {
    success: true,
    message: "Comment posted!",
    comment: data as CommentData,
  };
}
