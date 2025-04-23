import { PostCardSkeleton } from "@pec/shared";

import { QuestionsHeader } from "@/features/question/ui/QuestionsHeader";

export default function Loading() {
  return (
    <div className="container py-6">
      <QuestionsHeader />
      <div className="space-y-6">
        <PostCardSkeleton count={3} variant="question" />
      </div>
    </div>
  );
}
