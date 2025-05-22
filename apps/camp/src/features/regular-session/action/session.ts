"use server";
import { getRegularSession } from "@/entities/regular-session/action";
import { completeTask } from "@/shared/task/action";

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
  // This is a placeholder for actual implementation
  // In a real app, would use userId and week to fetch the specific recording
  return { recordingUrl: "https://example.com/recording" };
}
