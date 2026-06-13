import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for use in Server Actions and Route Handlers.
 * Uses the anon key — RLS policies control access.
 */
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    );
  }

  return createClient(url, key);
}
