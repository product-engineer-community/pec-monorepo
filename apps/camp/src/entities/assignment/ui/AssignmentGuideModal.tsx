"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@packages/ui";
import {
  AlertCircle,
  CheckCircle,
  Circle,
  Download,
  FileText,
  ListOrderedIcon,
  Target,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { completeTask } from "@/shared/action/task";

import { Assignment } from "../type";

interface AssignmentGuideModalProps {
  assignment: Assignment;
  userId: string;
  week: number;
  onClose?: () => void;
}

export function AssignmentGuideModal({
  assignment,
  userId,
  week,
  onClose,
}: AssignmentGuideModalProps) {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  // Initialize checklist state
  useEffect(() => {
    if (assignment.checklist) {
      setCheckedItems(new Array(assignment.checklist.length).fill(false));
    }
  }, [assignment.checklist]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const handleCheckItem = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const allItemsChecked =
    checkedItems.length > 0 && checkedItems.every(Boolean);

  const handleCompleteAssignment = async () => {
    if (!allItemsChecked) return;

    setIsCompleting(true);
    try {
      await completeTask({
        userId,
        week,
        taskType: "assignment",
        value: "true",
        valueType: "boolean",
      });
      await completeTask({
        userId,
        week,
        taskType: "assignment_checklist",
        value: "true",
        valueType: "boolean",
      });
      handleClose();
    } catch (error) {
      console.error("Failed to complete assignment:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => handleClose()}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {assignment.title}
          </DialogTitle>
          <DialogDescription>
            {week}주차 과제 가이드를 확인하고 체크리스트를 완료하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Example Image */}
          {assignment.exampleImageUrl && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Download className="h-4 w-4" />
                예시 이미지
              </h3>
              <div className="overflow-hidden rounded-lg border">
                <Image
                  src={assignment.exampleImageUrl}
                  alt="Assignment example"
                  className="h-auto w-full"
                />
              </div>
            </div>
          )}

          {/* Purpose */}
          {assignment.purpose && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4" />
                과제 목적
              </h3>
              <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                {assignment.purpose}
              </p>
            </div>
          )}

          {/* Process */}
          {assignment.process && assignment.process.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <ListOrderedIcon className="h-4 w-4" />
                진행 단계
              </h3>
              <ol className="space-y-2">
                {assignment.process.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tips */}
          {assignment.tips && assignment.tips.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />팁
              </h3>
              <ul className="space-y-1">
                {assignment.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Output */}
          {assignment.output && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                결과물
              </h3>
              <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                {assignment.output}
              </p>
            </div>
          )}

          {/* Checklist */}
          {assignment.checklist && assignment.checklist.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle className="h-4 w-4" />
                체크리스트
              </h3>
              <div className="space-y-2 rounded-lg border p-4">
                {assignment.checklist.map((item, index) => (
                  <label
                    key={index}
                    className="group flex cursor-pointer items-start gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => handleCheckItem(index)}
                      className="mt-0.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      {checkedItems[index] ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </button>
                    <span
                      className={`text-sm ${checkedItems[index] ? "text-muted-foreground line-through" : "text-foreground"} transition-colors group-hover:text-primary`}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              {/* Complete Assignment Button */}
              <div className="pt-2">
                <Button
                  onClick={handleCompleteAssignment}
                  disabled={!allItemsChecked || isCompleting}
                  className="w-full"
                  isLoading={isCompleting}
                >
                  {allItemsChecked
                    ? "과제 완료하기"
                    : `체크리스트 완료 (${checkedItems.filter(Boolean).length}/${checkedItems.length})`}
                </Button>
                {!allItemsChecked && (
                  <p className="mt-1 text-center text-xs text-muted-foreground">
                    모든 체크리스트를 완료해야 과제를 제출할 수 있습니다
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
