import { getUserFromSupabase } from "@packages/supabase";
import { Button, Input } from "@packages/ui";
import { redirect } from "next/navigation";

import { TasksCard } from "@/features/task/ui/TasksCard";
import Sidebar from "@/widgets/layout/sidebar";
import { RegularSessionTasks } from "@/widgets/RegularSession/ui/RegularSessionTasks";
import { getRegularSession } from "@/src/entities/regular-session/action";

// Mock data for other components
const weekDetails = {
  personalAssignment: {
    title: "개인 과제",
    status: "제출 완료",
    description: "Week 3 개인 과제: 고객 여정 맵 및 서비스 청사진 작성하기",
    submissionUrl: "https://miro.com/app/board/personal-assignment-123/",
    submitted: true,
    feedbackSessionScheduled: true,
    feedbackSessionDate: "2023-06-15T15:00:00",
  },
  feedbackSession: {
    title: "피드백 세션",
    status: "새 피드백!",
    feedbackUrl: "https://miro.com/app/board/feedback-123/",
    hasNewFeedback: true,
    sessionUrl: "https://zoom.us/j/987654321",
    sessionActive: false,
  },
  teamAssignment: {
    title: "팀 과제",
    status: "미제출",
    description: "Week 3 팀 과제: 서비스 컨셉 도출 및 사용자 페르소나 정의",
    submissionUrl: "",
    submitted: false,
    hasNewFeedback: false,
    feedbackUrl: "https://miro.com/app/board/team-feedback-123/",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const weekNum = parseInt((await params).week);
  const miroLink = ""; // Default empty value for miroLink

  // Mock user ID for now
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    redirect("/login");
  }

  const regularSession = await getRegularSession(weekNum);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar activeWeek={weekNum} />

      <div className="flex-1">
        <div className="p-4 md:p-6">
          <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">
            {weekNum}주차 {regularSession.title}
          </h1>

          <div className="flex flex-wrap gap-4 md:gap-6">
            {/* Regular Session Card - Using our new components */}
            <RegularSessionTasks userId={userId} week={weekNum} />

            {/* Personal Assignment Card */}
            <TasksCard
              title={weekDetails.personalAssignment.title}
              status={weekDetails.personalAssignment.status}
            >
              <div className="mb-4">
                <h4 className="mb-2 font-medium">과제 안내</h4>
                <p className="text-sm text-muted-foreground">
                  {weekDetails.personalAssignment.description}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <h4 className="font-medium">제출</h4>
                {weekDetails.personalAssignment.submitted ? (
                  <div className="space-y-2">
                    <div className="flex items-center rounded-md border border-input p-2">
                      <input
                        type="text"
                        value={weekDetails.personalAssignment.submissionUrl}
                        readOnly
                        className="flex-1 bg-transparent text-sm outline-none"
                      />
                      <Button variant="ghost" size="sm">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      다시 제출하기
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Miro 링크를 입력하세요"
                      value={miroLink}
                      readOnly
                      className="flex-1"
                    />
                    <Button>제출</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">피드백 세션</h4>
                {weekDetails.personalAssignment.feedbackSessionScheduled ? (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">
                      피드백 세션이 예약되었습니다
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        weekDetails.personalAssignment.feedbackSessionDate,
                      ).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    피드백 세션 일정 등록
                  </Button>
                )}
              </div>
            </TasksCard>

            {/* Feedback Session Card */}
            <TasksCard
              title={weekDetails.feedbackSession.title}
              status={weekDetails.feedbackSession.status}
            >
              <div className="mb-4 space-y-2">
                <h4 className="font-medium">피드백 알림</h4>
                <Button
                  variant={
                    weekDetails.feedbackSession.hasNewFeedback
                      ? "default"
                      : "outline"
                  }
                  className="w-full"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Miro 피드백 확인
                </Button>
                {weekDetails.feedbackSession.hasNewFeedback && (
                  <p className="text-warning text-sm font-medium">
                    코치가 새로운 피드백을 남겼어요!
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">세션 참여</h4>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!weekDetails.feedbackSession.sessionActive}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  피드백 세션 참여
                </Button>
                <p className="text-sm text-muted-foreground">
                  예정된 시간: 2023년 6월 15일 15:00
                </p>
              </div>
            </TasksCard>

            {/* Team Assignment Card */}
            <TasksCard
              title={weekDetails.teamAssignment.title}
              status={weekDetails.teamAssignment.status}
            >
              <div className="mb-4">
                <h4 className="mb-2 font-medium">과제 안내</h4>
                <p className="text-sm text-muted-foreground">
                  {weekDetails.teamAssignment.description}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <h4 className="font-medium">제출</h4>
                {weekDetails.teamAssignment.submitted ? (
                  <div className="space-y-2">
                    <div className="flex items-center rounded-md border border-input p-2">
                      <input
                        type="text"
                        value={weekDetails.teamAssignment.submissionUrl}
                        readOnly
                        className="flex-1 bg-transparent text-sm outline-none"
                      />
                      <Button variant="ghost" size="sm">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      다시 제출하기
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="팀 Miro 링크를 입력하세요"
                      value={miroLink}
                      readOnly
                      className="flex-1"
                    />
                    <Button>제출</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">피드백 확인</h4>
                <Button
                  variant={
                    weekDetails.teamAssignment.hasNewFeedback
                      ? "default"
                      : "outline"
                  }
                  className="w-full"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  피드백 확인
                </Button>
              </div>
            </TasksCard>
          </div>
        </div>
      </div>
    </div>
  );
}
