import { Badge, Progress } from "@packages/ui";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

// Mock data for weeks
const weeks = [
  { id: 1, label: "1주차", progress: 100 },
  { id: 2, label: "2주차", progress: 75 },
  { id: 3, label: "3주차", progress: 50 },
  { id: 4, label: "4주차", progress: 25 },
  { id: 5, label: "5주차", progress: 0 },
  { id: 6, label: "6주차", progress: 0 },
  { id: 7, label: "7주차", progress: 0 },
  { id: 8, label: "8주차", progress: 0 },
];

interface SidebarProps {
  activeWeek?: number;
}

export default function Sidebar({ activeWeek = 3 }: SidebarProps) {
  const activeWeekData =
    weeks.find((week) => week.id === activeWeek) || weeks[0];
  const prevWeek = activeWeek > 1 ? activeWeek - 1 : null;
  const nextWeek = activeWeek < weeks.length ? activeWeek + 1 : null;

  return (
    <>
      {/* Desktop sidebar - visible on md+ screens */}
      <div className="hidden w-64 border-r border-border bg-muted/30 p-4 md:block">
        <h2 className="mb-4 text-xl font-bold">주차별 커리큘럼</h2>
        <div className="space-y-3">
          {weeks.map((week) => (
            <div key={week.id} className="space-y-1">
              <Link
                href={`/dashboard/${week.id}`}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${
                  week.id === activeWeek
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <span>{week.label}</span>
                {week.id === activeWeek && (
                  <Badge variant="secondary" className="text-xs">
                    현재
                  </Badge>
                )}
              </Link>
              <Progress value={week.progress} className="h-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile week selector - with arrows to navigate */}
      <div className="mb-2 w-full border-b bg-background px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link
            href={
              prevWeek ? `/dashboard/${prevWeek}` : `/dashboard/${activeWeek}`
            }
            className={`rounded-full p-2 ${prevWeek ? "text-primary hover:bg-muted" : "cursor-not-allowed text-muted-foreground"}`}
            aria-disabled={!prevWeek}
          >
            <ArrowLeftCircleIcon />
          </Link>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">{activeWeekData.label}</h2>
            <div className="mt-1 w-32">
              <Progress value={activeWeekData.progress} className="h-1.5" />
            </div>
          </div>

          <Link
            href={
              nextWeek ? `/dashboard/${nextWeek}` : `/dashboard/${activeWeek}`
            }
            className={`rounded-full p-2 ${nextWeek ? "text-primary hover:bg-muted" : "cursor-not-allowed text-muted-foreground"}`}
            aria-disabled={!nextWeek}
          >
            <ArrowRightCircleIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
