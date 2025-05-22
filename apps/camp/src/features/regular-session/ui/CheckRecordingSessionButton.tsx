"use client";

import { Button } from "@packages/ui";
import { Disc2Icon } from "lucide-react";

interface CheckRecordingSessionButtonProps {
  recordingUrl: string | null;
}

export function CheckRecordingSessionButton({
  recordingUrl,
}: CheckRecordingSessionButtonProps) {
  const handleViewRecording = async () => {
    if (!recordingUrl) return;

    window.open(recordingUrl, "_blank");
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      disabled={!recordingUrl}
      onClick={handleViewRecording}
    >
      <Disc2Icon />
      {recordingUrl ? "녹화 영상 보기" : "녹화 영상 준비중"}
    </Button>
  );
}
