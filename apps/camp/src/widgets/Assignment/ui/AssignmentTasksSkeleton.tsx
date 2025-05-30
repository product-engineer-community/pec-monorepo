import { Card } from "@packages/ui";

export function AssignmentTasksSkeleton() {
  return (
    <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
      <div className="border-b border-border p-4">
        <div className="flex items-center">
          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
          <div className="ml-auto h-5 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 flex-1 animate-pulse rounded bg-muted" />
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>

        <div className="space-y pt-4">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-16 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </Card>
  );
}
