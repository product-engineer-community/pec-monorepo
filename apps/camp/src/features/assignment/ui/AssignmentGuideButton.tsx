"use client";

import { Checkbox } from "@packages/ui";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getTask } from "@/shared/action/task"; // Assuming getTask is in this path

interface AssignmentGuideButtonProps {
  week: number;
  title: string;
  userId: string; // Added userId
}

export function AssignmentGuideButton({
  week,
  title,
  userId,
}: AssignmentGuideButtonProps) {
  const [isChecklistCompleted, setIsChecklistCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTaskStatus() {
      setIsLoading(true);
      try {
        const tasks = await getTask({
          userId,
          week,
          taskType: "assignment_checklist",
        });
        if (tasks && tasks.length > 0 && tasks[0].value === "true") {
          setIsChecklistCompleted(true);
        } else {
          setIsChecklistCompleted(false);
        }
      } catch (error) {
        console.error("Failed to fetch assignment checklist status:", error);
        // Optionally, set some error state here
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      fetchTaskStatus();
    }
  }, [userId, week]);

  // The modal is opened via routing, so clicking the label/checkbox will navigate
  return (
    <div className="flex w-full items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
      <Checkbox
        id={`assignment-checklist-${week}-${title}`}
        checked={isChecklistCompleted}
        disabled={isLoading || isChecklistCompleted} // Disable if loading or already completed
        aria-label="과제 가이드 확인 및 체크리스트 완료"
        className="cursor-not-allowed" // To indicate it's not directly interactive for changing state
      />
      <Link
        href={`/dashboard/${week}/assignment/${title}`}
        className={`flex flex-1 items-center ${isLoading ? "cursor-wait" : isChecklistCompleted ? "cursor-not-allowed text-muted-foreground line-through" : "cursor-pointer"}`}
        aria-disabled={isLoading || isChecklistCompleted}
        onClick={(e) => {
          if (isLoading || isChecklistCompleted) {
            e.preventDefault();
          }
        }}
      >
        <label
          htmlFor={`assignment-checklist-${week}-${title}`}
          className={`flex-1 text-sm font-medium leading-none ${isLoading ? "cursor-wait" : isChecklistCompleted ? "cursor-not-allowed text-muted-foreground line-through" : "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}`}
        >
          과제 가이드 확인
        </label>
      </Link>
    </div>
  );
}
