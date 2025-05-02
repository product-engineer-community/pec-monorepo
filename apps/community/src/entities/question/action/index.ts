"use server";

import { getSupabaseServerClient } from "@/shared/supabase";

export async function incrementViewCount(id: string) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase
    .rpc("increment_view_count", { post_id: id })
    .select();

  if (error) {
    console.error("Error incrementing view count:", error);
    throw error;
  }
}
