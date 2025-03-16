interface PostCardSkeletonProps {
  count?: number;
  variant?: "discussion" | "question";
}

export function PostCardSkeleton({ count = 3, variant = "discussion" }: PostCardSkeletonProps) {
  if (variant === "discussion") {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 w-48 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                  <span className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  <span>•</span>
                  <span className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  <span>•</span>
                  <span className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-200 rounded-md w-16 h-6 animate-pulse" />
                  <span className="px-2 py-1 bg-gray-200 rounded-md w-16 h-6 animate-pulse" />
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <span className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <span className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-24 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 w-48 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                <span className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                <span>•</span>
                <span className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                <span>•</span>
                <span className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              <span className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
