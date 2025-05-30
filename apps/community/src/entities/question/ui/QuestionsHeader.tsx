import { getIsAuthenticated } from "@packages/auth/src/features";
import {
  AUTH_PATHNAME,
  COMMUNITY_PATHNAME,
  COMMUNITY_POST_WRITE_PATHNAME,
  getOrigin,
  SIGN_IN_PATHNAME,
} from "@packages/constants";
import { Button, postType } from "@packages/ui";
import Link from "next/link";

export async function QuestionsHeader() {
  const isAuthenticated = await getIsAuthenticated();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Link
          href={
            isAuthenticated
              ? {
                  pathname: COMMUNITY_POST_WRITE_PATHNAME,
                  query: { type: postType.Enum.question },
                }
              : {
                  pathname: `${getOrigin()}${AUTH_PATHNAME}${SIGN_IN_PATHNAME}`,
                  query: {
                    nextPathname: `${COMMUNITY_PATHNAME}${COMMUNITY_POST_WRITE_PATHNAME}?type=${postType.Enum.question}`,
                  },
                }
          }
        >
          <Button>글쓰기</Button>
        </Link>
      </div>

      <div className="mb-6 text-lg text-muted-foreground">
        기술과 철학에 대한 모든 질문을 자유롭게 나눌 수 있는 공간입니다.
      </div>
    </div>
  );
}
