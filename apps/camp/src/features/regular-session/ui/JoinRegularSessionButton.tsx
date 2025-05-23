"use client";

import { Button } from "@packages/ui";
import { VideoIcon } from "lucide-react";

import { joinRegularSession } from "../action/session";

interface JoinRegularSessionButtonProps {
  userId: string;
  week: number;
  isSessionActive?: boolean;
}

export function JoinRegularSessionButton({
  userId,
  week,
  isSessionActive = true,
}: JoinRegularSessionButtonProps) {
  const handleJoinSession = async () => {
    try {
      const result = await joinRegularSession(userId, week);
      // Redirect to the session URL
      window.open(result.sessionUrl, "_blank");
    } catch (error) {
      console.error("Failed to join session:", error);
    }
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={handleJoinSession}
      disabled={!isSessionActive}
    >
      <VideoIcon />
      세션 참여하기
    </Button>
  );
}
