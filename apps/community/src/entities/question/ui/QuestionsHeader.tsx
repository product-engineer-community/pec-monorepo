import { Button } from "@pec/shared";
import Link from "next/link";

import { COMMUNITY_POST_WRITE_PATHNAME } from "@/src/shared/config/pathname";

export function QuestionsHeader() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Link
          href={{
            pathname: COMMUNITY_POST_WRITE_PATHNAME,
            query: { type: "question" },
          }}
        >
          <Button>Ask Question</Button>
        </Link>
      </div>

      <div className="mb-6 text-lg text-muted-foreground">
        기술과 철학에 대한 모든 질문을 자유롭게 나눌 수 있는 공간입니다.
      </div>
    </div>
  );
}
