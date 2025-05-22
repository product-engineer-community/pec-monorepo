"use client";

import { RegularSession } from "@/entities/regular-session/type";
import { CheckRecordingSessionButton } from "@/features/regular-session/ui/CheckRecordingSessionButton";
import { DownloadSessionGuideButton } from "@/features/regular-session/ui/DownloadSessionGuideButton";
import { JoinRegularSessionButton } from "@/features/regular-session/ui/JoinRegularSessionButton";
import { TimerReadingSessionGuideButton } from "@/features/regular-session/ui/TimerReadingSessionGuideButton";
import { TasksCard } from "@/features/task/ui/TasksCard";

interface RegularSessionTasksProps {
  userId: string;
  week: number;
  regularSession: RegularSession;
  status?: string;
}

export function RegularSessionTasks({
  userId,
  week,
  regularSession,
  status = "진행중", // Default status if not provided
}: RegularSessionTasksProps) {
  return (
    <TasksCard title={regularSession.title} status={status}>
      <div className="mb-4 space-y-2">
        <h4 className="font-medium">가이드</h4>
        <div className="flex flex-wrap gap-2">
          <DownloadSessionGuideButton userId={userId} week={week} />
          <TimerReadingSessionGuideButton
            userId={userId}
            week={week}
            defaultIsCompleted={false}
          />
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <h4 className="font-medium">세션 참여</h4>
        <JoinRegularSessionButton userId={userId} week={week} />
        <p className="text-sm text-muted-foreground">
          세션 시작 5분 전부터 참여 가능합니다
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">녹화본</h4>
        <CheckRecordingSessionButton userId={userId} week={week} />
      </div>
    </TasksCard>
  );
}
