import { Badge, Button, Card, Input } from "@packages/ui";

import Sidebar from "@/widgets/layout/sidebar";

// Mock data for week details
const weekDetails = {
  regularSession: {
    title: "정규 세션",
    status: "진행중",
    guideUrl: "/guides/week3-guide.pdf",
    sessionUrl: "https://zoom.us/j/123456789",
    recordingUrl: "https://vimeo.com/123456789",
    readingComplete: false,
  },
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

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const getVariant = (): BadgeVariant => {
    switch (status) {
      case "진행중":
        return "default";
      case "완료":
      case "제출 완료":
        return "secondary";
      case "미제출":
        return "destructive";
      case "새 피드백!":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <Badge variant={getVariant()} className="ml-2">
      {status}
    </Badge>
  );
}

export default async function Home({ params }: { params: { week: string } }) {
  const weekNum = parseInt(params.week);
  const miroLink = ""; // Default empty value for miroLink

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar activeWeek={weekNum} />

      <div className="flex-1">
        <div className="p-4 md:p-6">
          <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">
            {weekNum}주차
          </h1>

          <div className="flex flex-wrap gap-4 md:gap-6">
            {/* Regular Session Card */}
            <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
              <div className="border-b border-border p-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium">
                    {weekDetails.regularSession.title}
                  </h3>
                  <StatusBadge status={weekDetails.regularSession.status} />
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4 space-y-2">
                  <h4 className="font-medium">가이드</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      가이드 다운로드
                    </Button>
                    <Button variant="default" size="sm">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      15분 읽기 시작
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="readingComplete"
                      checked={weekDetails.regularSession.readingComplete}
                      className="mr-2 h-4 w-4 rounded border-gray-300"
                      readOnly
                    />
                    <label htmlFor="readingComplete">읽기 완료</label>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <h4 className="font-medium">세션 참여</h4>
                  <Button className="w-full">
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
                    세션 참여하기
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    세션 시작 5분 전부터 참여 가능합니다
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">녹화본</h4>
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
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    녹화 영상 보기
                  </Button>
                </div>
              </div>
            </Card>

            {/* Personal Assignment Card */}
            <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
              <div className="border-b border-border p-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium">
                    {weekDetails.personalAssignment.title}
                  </h3>
                  <StatusBadge status={weekDetails.personalAssignment.status} />
                </div>
              </div>
              <div className="p-4">
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
              </div>
            </Card>

            {/* Feedback Session Card */}
            <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
              <div className="border-b border-border p-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium">
                    {weekDetails.feedbackSession.title}
                  </h3>
                  <StatusBadge status={weekDetails.feedbackSession.status} />
                </div>
              </div>
              <div className="p-4">
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
              </div>
            </Card>

            {/* Team Assignment Card */}
            <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
              <div className="border-b border-border p-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium">
                    {weekDetails.teamAssignment.title}
                  </h3>
                  <StatusBadge status={weekDetails.teamAssignment.status} />
                </div>
              </div>
              <div className="p-4">
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
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
