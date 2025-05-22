"use server";
import { getSupabaseServerClient } from "@packages/supabase";

import { getRegularSession } from "@/entities/regular-session/action";
import { completeTask } from "@/shared/action/task";
import { getProfile } from "@/src/shared/action/profile";
import { getRegularSessionRecordingFromYoutube } from "@/src/shared/action/youtube";

export async function downloadSessionGuide(userId: string, week: number) {
  const regularSession = await getRegularSession(week);

  // Mark task as complete
  await completeTask({
    userId,
    week,
    taskType: "download_regular_session_guide",
  });

  // Return the guide URL
  return {
    success: true,
    guideUrl: regularSession.guideUrl,
  };
}

export async function joinRegularSession(userId: string, week: number) {
  const regularSession = await getRegularSession(week);

  // Mark task as complete
  await completeTask({
    userId,
    week,
    taskType: "join_regular_session",
  });

  // Return the session URL
  return {
    success: true,
    sessionUrl: regularSession.sessionUrl,
  };
}

export async function checkSessionRecording(userId: string, week: number) {
  const profile = await getProfile(userId);
  const generation = profile.camp_generation;

  const regularSessionRecordingList =
    await getRegularSessionRecordingFromYoutube();

  const regularSessionRecording = regularSessionRecordingList.find(
    (recording: any) =>
      recording.snippet.title.includes(generation) &&
      recording.snippet.title.includes(week.toString()),
  );

  return {
    recordingUrl: regularSessionRecording
      ? `https://www.youtube.com/watch?v=${regularSessionRecording.snippet.resourceId.videoId}`
      : null,
  };
}
