"use client";

import { Button } from "@packages/ui";
import { VideotapeIcon } from "lucide-react";
import { toast } from "sonner";

import { checkSessionRecording } from "../action/session";

interface CheckRecordingSessionButtonProps {
  userId: string;
  week: number;
}

export function CheckRecordingSessionButton({
  userId,
  week,
}: CheckRecordingSessionButtonProps) {
  const handleViewRecording = async () => {
    try {
      const result = await checkSessionRecording(userId, week);
      window.open(result.recordingUrl, "_blank");
    } catch (error) {
      console.error("Failed to view recording:", error);
      toast.error("녹화 영상을 불러오는데 실패했습니다.");
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleViewRecording}>
      <VideotapeIcon />
      녹화 영상 보기
    </Button>
  );
}
