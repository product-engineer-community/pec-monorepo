import { Card } from "@packages/ui";

export function RegularSessionTasksSkeleton() {
  return (
    <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
      <div className="border-b border-border p-4">
        <div className="flex items-center">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="ml-auto h-5 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 space-y-2">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />
            <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-40 animate-pulse rounded bg-muted" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </Card>
  );
}
