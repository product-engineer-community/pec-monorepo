"use server";
import { getSupabaseServerClient } from "@packages/supabase";

import { RegularSession } from "../type";

export async function getRegularSession(week: number): Promise<RegularSession> {
  const supabase = await getSupabaseServerClient();

  const [
    { data: regularSessionData, error: regularSessionError },
    { data: sessionZoomUrlData, error: sessionZoomUrlError },
  ] = await Promise.all([
    await supabase
      .from("regular_session")
      .select("*")
      .eq("week", week)
      .single(),
    supabase
      .from("session_zoom_url")
      .select("*")
      .eq("type", "regular")
      .single(),
  ]);
  if (regularSessionError || sessionZoomUrlError) {
    throw new Error(
      regularSessionError?.message || sessionZoomUrlError?.message,
    );
  }

  return {
    week: regularSessionData.week,
    title: regularSessionData.title,
    guideUrl: regularSessionData.regular_session_guide_url ?? "",
    sessionUrl: sessionZoomUrlData.zoom_url ?? "",
  };
}
