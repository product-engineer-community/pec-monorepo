import { PostCardSkeleton } from "@pec/shared";

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
      </div>
      <div className="space-y-6">
        <PostCardSkeleton variant="question" />
        <PostCardSkeleton variant="question" />
        <PostCardSkeleton variant="question" />
      </div>
    </div>
  );
}
