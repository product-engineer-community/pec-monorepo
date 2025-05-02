import { Button } from "@pec/shared";
import Link from "next/link";

export function DiscussionsHeader() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <Link
          href={{
            pathname: "/community/create",
            query: { type: "discussion" },
          }}
        >
          <Button>New Discussion</Button>
        </Link>
      </div>
      <div className="mb-6 text-lg text-muted-foreground">
        함께 생각을 확장해 나가는 토론 중심 공간 입니다.
      </div>
    </div>
  );
}
