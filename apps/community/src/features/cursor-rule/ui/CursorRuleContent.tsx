"use client";

import { Card, CardContent, CardHeader } from "@/shared/ui";

interface CursorRuleContentProps {
  path: string;
  content: string;
}

export function CursorRuleContent({ path, content }: CursorRuleContentProps) {
  return (
    <Card>
      <CardHeader className="border-b p-4">
        <h2 className="text-xl font-semibold">Cursor Rule</h2>
        <p className="text-sm text-gray-500">{path}</p>
      </CardHeader>
      <CardContent className="p-4">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm">
          {content}
        </pre>
      </CardContent>
    </Card>
  );
}
