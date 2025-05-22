import { Card } from "@packages/ui";
import { ReactNode } from "react";

import { StatusBadge } from "@/shared/ui/StatusBadge";

interface TasksCardProps {
  title: string;
  status: string;
  children: ReactNode;
}

export function TasksCard({ title, status, children }: TasksCardProps) {
  return (
    <Card className="w-full overflow-hidden lg:w-[calc(50%-12px)]">
      <div className="border-b border-border p-4">
        <div className="flex items-center">
          <h3 className="text-xl font-medium">{title}</h3>
          <StatusBadge status={status} />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </Card>
  );
}
