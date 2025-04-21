import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

export async function getAuthSession(supabase: SupabaseClient<Database>) {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function signOut(supabase: SupabaseClient<Database>) {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error:", error);
  }
}
