"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase";
import { getTeamFromCookie } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { submissionConfirmationEmail } from "@/lib/email-templates";

const MAX_SCREENSHOTS = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export interface SubmitProjectState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  projectId?: string;
}

/**
 * Validates and submits a project for the currently authenticated team.
 * Handles file uploads to Supabase Storage.
 */
export async function submitProject(
  prevState: SubmitProjectState,
  formData: FormData
): Promise<SubmitProjectState> {
  // 1. Verify team authentication
  const team = await getTeamFromCookie();
  if (!team) {
    return {
      success: false,
      message: "Your session has expired. Please re-enter your team credentials.",
    };
  }

  // 2. Extract and validate fields
  const name = (formData.get("name") as string)?.trim();
  const tagline = (formData.get("tagline") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const technologiesRaw = (formData.get("technologies") as string)?.trim();
  const track = (formData.get("track") as string)?.trim();
  const githubUrl = (formData.get("githubUrl") as string)?.trim();
  const demoUrl = (formData.get("demoUrl") as string)?.trim();
  const liveUrl = (formData.get("liveUrl") as string)?.trim();

  // Parse technologies (comma or newline separated)
  const technologies = technologiesRaw
    ? technologiesRaw
        .split(/[\n,]+/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const errors: Record<string, string> = {};

  if (!name || name.length < 3) {
    errors.name = "Project name must be at least 3 characters.";
  }
  if (!tagline || tagline.length < 10) {
    errors.tagline = "Tagline must be at least 10 characters.";
  }
  if (!description || description.length < 100) {
    errors.description =
      "Description must be at least 100 characters to give a meaningful overview.";
  }
  if (technologies.length < 1) {
    errors.technologies = "Please list at least one technology used.";
  }

  // Validate screenshots
  const screenshotFiles = formData.getAll("screenshots").filter(
    (v): v is File => v instanceof File && v.size > 0
  );

  if (screenshotFiles.length === 0) {
    errors.screenshots = "Please upload at least one screenshot.";
  }
  if (screenshotFiles.length > MAX_SCREENSHOTS) {
    errors.screenshots = `Maximum ${MAX_SCREENSHOTS} screenshots allowed.`;
  }
  for (const file of screenshotFiles) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      errors.screenshots = `File "${file.name}" is not a supported image format. Use PNG, JPEG, WebP, or GIF.`;
      break;
    }
    if (file.size > MAX_FILE_SIZE) {
      errors.screenshots = `File "${file.name}" exceeds the 5MB size limit.`;
      break;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  // 3. Check if this team already has a submission
  const supabase = createSupabaseServerClient();
  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("registration_id", team.registrationId)
    .single();

  if (existing) {
    return {
      success: false,
      message: "Your team has already submitted a project. Each team may only submit one project.",
    };
  }

  // 4. Insert project
  const { data: project, error: insertError } = await supabase
    .from("projects")
    .insert({
      registration_id: team.registrationId,
      name,
      tagline,
      description,
      technologies,
      track: track || null,
      github_url: githubUrl || null,
      demo_url: demoUrl || null,
      live_url: liveUrl || null,
    })
    .select("id")
    .single();

  if (insertError || !project) {
    console.error("Project insert error:", insertError);
    return {
      success: false,
      message: "Failed to save your project. Please try again.",
    };
  }

  // 5. Upload screenshots using admin client (bypasses RLS)
  const adminClient = createSupabaseAdminClient();

  for (let i = 0; i < screenshotFiles.length; i++) {
    const file = screenshotFiles[i];
    const ext = file.name.split(".").pop() || "png";
    const storagePath = `${project.id}/${i}-${crypto.randomUUID()}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await adminClient.storage
      .from("project-assets")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Screenshot upload error:", uploadError);
      // Don't fail the whole submission — the project row is already created
      continue;
    }

    // Insert screenshot metadata
    await adminClient.from("project_screenshots").insert({
      project_id: project.id,
      storage_path: storagePath,
      alt_text: file.name,
      sort_order: i,
    });
  }

  // 6. Send submission confirmation emails (fire-and-forget)
  const { data: registration } = await supabase
    .from("registrations")
    .select("team_name, members")
    .eq("id", team.registrationId)
    .single();

  if (registration) {
    const members = registration.members as { name: string; email: string }[];
    const projectUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://neurox.akashdesilva.space"}/projects/${project.id}`;

    await Promise.allSettled(
      members.map(async (member) => {
        const { subject, html } = submissionConfirmationEmail({
          teamName: registration.team_name,
          memberName: member.name,
          projectName: name,
          projectTagline: tagline,
          projectId: project.id,
          projectUrl,
        });
        try {
          await sendEmail({ to: member.email, subject, html });
        } catch (err) {
          console.error(
            "Failed to send submission confirmation to",
            member.email,
            err
          );
        }
      })
    );
  }

  // 7. Revalidate and return
  revalidatePath("/projects");

  return {
    success: true,
    message: `Project "${name}" submitted successfully! View it in the gallery.`,
    projectId: project.id,
  };
}
