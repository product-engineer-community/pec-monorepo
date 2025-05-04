"use server";

import { getSupabaseServerClient } from "@/src/shared/supabase";

export async function getUsername(userId: string) {
  const supabase = await getSupabaseServerClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw profileError;
  }

  return {
    username: profile.username,
  };
}
