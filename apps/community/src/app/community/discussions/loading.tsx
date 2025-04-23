import { PostCardSkeleton } from "@pec/shared";

import { DiscussionsHeader } from "@/features/discussion/ui/DiscussionsHeader";

export default function DiscussionsLoading() {
  return (
    <div className="container py-6">
      <DiscussionsHeader />
      <div className="space-y-6">
        <PostCardSkeleton variant="discussion" count={5} />
      </div>
    </div>
  );
}
