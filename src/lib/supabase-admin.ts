import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for server-side operations that need
 * full database access (file uploads, admin queries).
 * Only use in server actions — never expose to the client.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(url, key);
}
