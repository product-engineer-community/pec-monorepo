import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = (
  supabaseUrl: string,
  supabaseKey: string
) => {
  return createClient(supabaseUrl, supabaseKey);
};

export * from "./client";
export * from "./server";
export * from "./actions";
export * from "./types";

export type { SupabaseConfig } from "./client";
export { getSupabaseClient } from "./client";
export { createClient } from "@supabase/supabase-js";
