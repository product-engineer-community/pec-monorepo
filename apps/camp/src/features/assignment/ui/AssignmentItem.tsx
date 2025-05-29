"use client";

import { Button, Input } from "@packages/ui";
import { useEffect, useState } from "react";

import type { Assignment } from "@/entities/assignment/type";
import { AssignmentGuideButton } from "@/features/assignment/ui/AssignmentGuideButton";
import { getTask } from "@/shared/action/task";

// Mock submission data - in real app, this would come from a task/submission entity
const getSubmissionData = (assignmentId: string) => ({
  submissionUrl: assignmentId.includes("1")
    ? "https://miro.com/app/board/personal-assignment-123/"
    : "",
  submitted: assignmentId.includes("1"),
  feedbackSessionScheduled: assignmentId.includes("1"),
  feedbackSessionDate: "2023-06-15T15:00:00",
});

interface AssignmentItemProps {
  assignment: Assignment;
  week: number;
  userId: string;
}

export function AssignmentItem({
  assignment,
  week,
  userId,
}: AssignmentItemProps) {
  const submissionData = getSubmissionData(assignment.id);
  const [isChecklistCompleted, setIsChecklistCompleted] = useState(false);
  const [isLoadingChecklist, setIsLoadingChecklist] = useState(true);

  useEffect(() => {
    async function fetchChecklistStatus() {
      if (!userId) {
        setIsLoadingChecklist(false);
        return;
      }
      setIsLoadingChecklist(true);
      try {
        const tasks = await getTask({
          userId,
          week,
          taskType: "assignment_checklist",
        });
        const checklistTask = tasks.find((task) => task.value === "true");
        setIsChecklistCompleted(!!checklistTask);
      } catch (error) {
        console.error("Failed to fetch assignment checklist status:", error);
        setIsChecklistCompleted(false);
      } finally {
        setIsLoadingChecklist(false);
      }
    }
    fetchChecklistStatus();
  }, [userId, week, assignment.title]);

  return (
    <div className="space-y-4">
      <AssignmentGuideButton
        week={week}
        title={assignment.title}
        userId={userId}
      />

      <div className="space-y-2">
        <h5 className="text-sm font-medium">제출</h5>
        {submissionData.submitted ? (
          <div className="space-y-2">
            <div className="flex items-center rounded-md border border-input p-2">
              <input
                type="text"
                value={submissionData.submissionUrl}
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
            <Button
              variant="outline"
              size="sm"
              disabled={isLoadingChecklist || !isChecklistCompleted}
            >
              다시 제출하기
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Input
              placeholder="Miro 링크를 입력하세요"
              className="flex-1"
              disabled={isLoadingChecklist || !isChecklistCompleted}
            />
            <Button disabled={isLoadingChecklist || !isChecklistCompleted}>
              제출
            </Button>
          </div>
        )}
        {(isLoadingChecklist || !isChecklistCompleted) &&
          !submissionData.submitted && (
            <p className="mt-1 text-xs text-destructive">
              과제 가이드의 체크리스트를 먼저 완료해주세요.
            </p>
          )}
      </div>
    </div>
  );
}
