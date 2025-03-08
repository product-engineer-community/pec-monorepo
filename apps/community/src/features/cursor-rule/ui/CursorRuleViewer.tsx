"use client";

import { useCursorRules } from "@/entities/cursor-rule/model";
import { CursorRuleList } from "@/entities/cursor-rule/ui";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function CursorRuleViewer() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useCursorRules({
    page,
    per_page: 10,
  });

  return (
    <div className="w-full">
      <CursorRuleList
        rules={data?.rules ?? []}
        isLoading={isLoading}
        error={error?.message}
      />
      {data?.total && (
        <div className="mt-4 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="py-2">
            Page {page} of {Math.ceil((data.total || 0) / 10)}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil((data.total || 0) / 10)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
