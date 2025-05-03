import { getSupabaseServerClient } from "@/src/shared/supabase/server";

export const getUserPoint = async (authorId: string) => {
  const supabase = await getSupabaseServerClient();
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
