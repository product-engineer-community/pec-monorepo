export function CommentsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 rounded bg-gray-200" />
        <div className="h-6 w-20 rounded bg-gray-200" />
      </div>

      {/* 댓글 입력 영역 */}
      <div className="h-24 w-full rounded bg-gray-200" />

      {/* 댓글 아이템 */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2 border-b pb-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div>
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-16 rounded bg-gray-200" />
              </div>
            </div>
            <div className="h-4 w-12 rounded bg-gray-200" />
          </div>
          <div className="space-y-1 pl-10">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
