"use client";

import { Button } from "@packages/ui";
import { CheckCircle, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { completeTask } from "@/shared/action/task";

interface TimerReadingSessionGuideButtonProps {
  defaultIsCompleted?: boolean;
  userId: string;
  week: number;
}

export function TimerReadingSessionGuideButton({
  userId,
  week,
  defaultIsCompleted,
}: TimerReadingSessionGuideButtonProps) {
  const [isReading, setIsReading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(defaultIsCompleted);
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  const handleReadingComplete = useCallback(async () => {
    try {
      await completeTask({
        userId,
        week,
        taskType: "read_regular_session_guide",
      });
    } catch (error) {
      console.error("Failed to mark reading as complete:", error);
    }
  }, [userId, week]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isReading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isReading && timeLeft === 0) {
      setIsReading(false);
      setIsCompleted(true);
      handleReadingComplete();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isReading, timeLeft, handleReadingComplete]);

  const handleStartReading = () => {
    if (!isCompleted) {
      setIsReading(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="space-y-2">
      <Button
        className="p-4"
        variant={isCompleted ? "outline" : "default"}
        size="sm"
        onClick={handleStartReading}
        disabled={isCompleted}
      >
        {isCompleted ? <CheckCircle /> : <Timer />}
        {isReading
          ? `남은 시간: ${formatTime(timeLeft)}`
          : isCompleted
            ? "읽기 완료"
            : "10분 읽기 시작"}
      </Button>

      {!isReading && !isCompleted && (
        <p className="text-xs text-muted-foreground">
          가이드를 10분 동안 읽은 후 완료 처리됩니다
        </p>
      )}
    </div>
  );
}
