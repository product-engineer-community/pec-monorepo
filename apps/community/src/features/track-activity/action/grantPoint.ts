"use server";

import { getSupabaseServerClient } from "@packages/supabase";

import { getUserPoint } from "@/src/entities/point/action";
import { getPointForAction, PointType } from "@/src/entities/point/model";

export async function grantPointAction(userId: string, action: PointType) {
  const point = getPointForAction(action);
  const currentPoint = await getUserPoint(userId);
  const newPoint = currentPoint + point;

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("points")
    .upsert([{ author_id: userId, point: newPoint }], {
      onConflict: "author_id",
    })
    .select()
    .single();

  if (error) {
    return { points: 0, error: error.message };
  }
  return { points: data?.point ?? point, error: null };
}
