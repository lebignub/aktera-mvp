import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client.
 * Returns null if Supabase is not configured (mock mode).
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createBrowserClient(url, key);
}
