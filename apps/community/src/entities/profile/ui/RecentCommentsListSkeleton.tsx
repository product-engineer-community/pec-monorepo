import { Card, CardContent, CardHeader, CardTitle } from "@packages/ui";

export function RecentCommentsListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          최근 내 글에 달린 댓글
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded bg-gray-200" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="ml-6 flex items-center gap-2">
                  <div className="h-3 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-2 rounded bg-gray-200" />
                  <div className="h-5 w-16 rounded bg-gray-200" />
                  <div className="h-3 w-2 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
