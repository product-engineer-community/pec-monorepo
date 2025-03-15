import { Card, CardContent, CardHeader } from "@ui/card";
import { Skeleton } from "@ui/skeleton";
import { CursorRuleItemResponse } from "../model/types";
import Link from "next/link";

interface CursorRuleListProps {
  rules: CursorRuleItemResponse[];
  isLoading: boolean;
  error?: string;
}

export function CursorRuleList({
  rules,
  isLoading,
  error,
}: CursorRuleListProps) {
  if (error) {
    return (
      <div className="mx-auto w-full max-w-2xl p-4">
        <Card className="bg-red-50">
          <CardContent className="p-4 text-red-500">Error: {error}</CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-4">
      {rules.map((rule) => (
        <Card key={rule.path}>
          <Link href={`/cursor-rules/${rule.path}`}>
            <CardHeader className="font-semibold">{rule.path}</CardHeader>
          </Link>
          <CardContent className="text-sm text-gray-600">
            <div>Type: {rule.type}</div>
            <div>Size: {rule.size} bytes</div>
            <Link href={rule.url} className="text-blue-500 hover:underline">
              View on GitHub
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
