import { PostType, postType } from "../../types/schema";

type PostCardSkeletonProps = {
  count?: number;
  variant?: PostType;
};

export function PostCardSkeleton({
  count = 3,
  variant = postType.Enum.article,
}: PostCardSkeletonProps) {
  if (variant === postType.Enum.article) {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="mb-2 h-6 w-48 animate-pulse rounded bg-gray-200" />
                <div className="mb-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  <span className="hidden sm:inline">•</span>
                  <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  <span className="hidden sm:inline">•</span>
                  <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="h-6 w-16 animate-pulse rounded-md bg-gray-200 px-2 py-1" />
                  <span className="h-6 w-16 animate-pulse rounded-md bg-gray-200 px-2 py-1" />
                </div>
              </div>
              <div className="flex flex-row gap-4 text-sm text-muted-foreground sm:flex-col">
                <span className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                <span className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                <span className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
            <div className="h-24 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border p-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="mb-2 h-6 w-48 animate-pulse rounded bg-gray-200" />
              <div className="mb-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <span className="hidden sm:inline">•</span>
                <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <span className="hidden sm:inline">•</span>
                <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
            <div className="flex flex-row gap-4 text-sm text-muted-foreground sm:flex-col">
              <span className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <span className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-32 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
