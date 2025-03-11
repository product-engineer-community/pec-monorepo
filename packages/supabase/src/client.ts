import { createClient } from "@supabase/supabase-js";

export type SupabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient(config?: SupabaseConfig) {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl =
    config?.supabaseUrl ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    config?.supabaseKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("??", supabaseUrl, supabaseKey);
  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}
