import { getIsAuthenticated } from "@packages/auth/src/features";
import {
  AUTH_PATHNAME,
  COMMUNITY_PATHNAME,
  COMMUNITY_POST_WRITE_PATHNAME,
  getOrigin,
  SIGN_IN_PATHNAME,
} from "@packages/constants";
import { Button } from "@packages/ui";
import Link from "next/link";

export async function DiscussionsHeader() {
  const isAuthenticated = await getIsAuthenticated();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <Link
          href={
            isAuthenticated
              ? {
                  pathname: COMMUNITY_POST_WRITE_PATHNAME,
                  query: { type: "discussion" },
                }
              : {
                  pathname: `${getOrigin()}${AUTH_PATHNAME}${SIGN_IN_PATHNAME}`,
                  query: {
                    nextPathname: `${getOrigin()}${COMMUNITY_PATHNAME}${COMMUNITY_POST_WRITE_PATHNAME}?type=discussion`,
                  },
                }
          }
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
