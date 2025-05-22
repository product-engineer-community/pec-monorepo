import {
  CheckRecordingSessionButton,
  DownloadSessionGuideButton,
  JoinRegularSessionButton,
  TimerReadingSessionGuideButton,
} from "@/features/regular-session/ui";
import { TasksCard } from "@/features/task/ui/TasksCard";
import { getRegularSession } from "@/entities/regular-session/action";

interface RegularSessionTasksProps {
  userId: string;
  week: number;
}

export async function RegularSessionTasks({
  userId,
  week,
}: RegularSessionTasksProps) {
  const regularSession = await getRegularSession(week);

  return (
    <TasksCard title={regularSession.title} status={"진행중"}>
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
