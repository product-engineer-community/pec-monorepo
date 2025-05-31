import { getAuthSession } from "@packages/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
} from "@packages/ui";
import { FileText } from "lucide-react";

import { getAssignmentList } from "@/entities/assignment/action";
import { AssignmentItem } from "@/features/assignment";
import { TasksCard } from "@/features/task/ui/TasksCard";

const submissionData = {
  submissionUrl: "https://miro.com/app/board/personal-assignment-123/",
  submitted: true,
  feedbackSessionScheduled: true,
  feedbackSessionDate: "2023-06-15T15:00:00",
};

interface AssignmentTasksProps {
  title: string;
  week: number;
}

export async function AssignmentTasks({ title, week }: AssignmentTasksProps) {
  const session = await getAuthSession();
  const userId = session?.user?.id;

  if (!userId) {
    console.warn(
      "User not logged in, cannot display assignments with checklist status.",
    );
  }

  const assignments = (await getAssignmentList(week)).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <TasksCard title={title} status={"진행중"}>
      {assignments.length === 0 ? (
        <div className="py-4 text-center">
          <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            이번 주에는 과제가 없습니다.
          </p>
        </div>
      ) : assignments.length <= 2 ? (
        <div className="space-y-6">
          {assignments.map((assignment) => (
            <AssignmentItem
              key={assignment.id}
              assignment={assignment}
              week={week}
              userId={userId || ""}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="mb-2 text-sm text-muted-foreground">
              이번 주에는 {assignments.length}개의 과제가 있습니다.
            </p>
            <p className="text-xs text-muted-foreground">
              각 과제를 선택한 후, 과제 가이드를 확인하고 제출하세요.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {assignments.map((assignment, index) => (
              <AccordionItem key={assignment.id} value={`assignment-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">단계 {index + 1}</Badge>
                    <span className="font-medium">{assignment.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AssignmentItem
                    assignment={assignment}
                    week={week}
                    userId={userId || ""}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      <div className="space-y pt-4">
        <h5 className="text-md font-medium">피드백 세션</h5>
        {submissionData.feedbackSessionScheduled ? (
          <div className="mt-2 rounded-md bg-muted p-3">
            <p className="text-sm font-medium">피드백 세션이 예약되었습니다</p>
            <p className="text-xs text-muted-foreground">
              {new Date(submissionData.feedbackSessionDate).toLocaleString(
                "ko-KR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
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
  );
}
