import { Card, CardContent, CardHeader, CardTitle } from "@packages/ui";

export function UserPostsListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">내가 쓴 글</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/2 rounded bg-gray-200" />
                  </div>
                  <div className="ml-2 h-6 w-16 rounded bg-gray-200" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-8 rounded bg-gray-200" />
                    <div className="h-3 w-8 rounded bg-gray-200" />
                    <div className="h-3 w-8 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
