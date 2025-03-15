import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import type { Env } from "@pec/env";

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient(env?: Env) {
  if (!env && !supabaseClient) {
    throw new Error(
      "Environment variables are required for initial client creation"
    );
  }

  if (!supabaseClient && env) {
    supabaseClient = createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return supabaseClient!;
}
