"use client";
import { Button } from "@packages/ui";
import Link from "next/link";

export default function DiscussionsError({ reset }: { reset: () => void }) {
  return (
    <div className="container flex h-[50vh] flex-col items-center justify-center py-6">
      <h1 className="mb-4 text-2xl font-bold">문제가 발생했습니다</h1>
      <p className="mb-8 text-muted-foreground">
        데이터를 불러오는 중에 오류가 발생했습니다.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          다시 시도
        </Button>
        <Link href="/community">
          <Button>커뮤니티 홈으로</Button>
        </Link>
      </div>
    </div>
  );
}
