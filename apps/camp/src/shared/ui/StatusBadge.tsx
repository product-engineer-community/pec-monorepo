import { Badge } from "@packages/ui";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = (): BadgeVariant => {
    switch (status) {
      case "진행중":
        return "default";
      case "완료":
      case "제출 완료":
        return "secondary";
      case "미제출":
        return "destructive";
      case "새 피드백!":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <Badge variant={getVariant()} className="ml-2">
      {status}
    </Badge>
  );
}
