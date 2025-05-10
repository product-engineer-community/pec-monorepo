import { getSupabaseClient } from "@packages/supabase/src/client";

export const getUserPoint = async (authorId: string) => {
  const supabase = getSupabaseClient({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });
  const { data, error } = await supabase
    .from("points")
    .select("point")
    .eq("author_id", authorId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  const point = data?.point;

  return point ?? 0;
};
