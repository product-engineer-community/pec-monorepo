"use client";

import { Button } from "@packages/ui";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

import { downloadSessionGuide } from "../action/session";

interface DownloadSessionGuideButtonProps {
  userId: string;
  week: number;
}

export function DownloadSessionGuideButton({
  userId,
  week,
}: DownloadSessionGuideButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const result = await downloadSessionGuide(userId, week);
      // Open the guide in a new tab
      window.open(result.guideUrl, "_blank");
    } catch (error) {
      console.error("Failed to download guide:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isLoading}
    >
      <DownloadIcon />
      가이드 다운로드
    </Button>
  );
}
