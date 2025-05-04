import { Button } from "@pec/shared";
import Link from "next/link";

import { COMMUNITY_POST_WRITE_PATHNAME } from "@/src/shared/config/pathname";

export function DiscussionsHeader() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <Link
          href={{
            pathname: COMMUNITY_POST_WRITE_PATHNAME,
            query: { type: "discussion" },
          }}
        >
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="mb-6 text-lg text-muted-foreground">
        함께 생각을 확장해 나가는 토론 중심 공간 입니다.
      </div>
    </div>
  );
}
