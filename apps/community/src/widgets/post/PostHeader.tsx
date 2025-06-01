import { getIsAuthenticated } from "@packages/auth/src/features";
import {
  AUTH_PATHNAME,
  COMMUNITY_PATHNAME,
  COMMUNITY_POST_WRITE_PATHNAME,
  getOrigin,
  SIGN_IN_PATHNAME,
} from "@packages/constants";
import { Button, PostType, postType as postTypeSchema } from "@packages/ui"; // Ensure PostType and postTypeSchema are imported
import Link from "next/link";

interface PostHeaderProps {
  title: string;
  description: string;
  postTypeForWriteButton: PostType; // Use the imported PostType
}

export async function PostHeader({ title, description, postTypeForWriteButton }: PostHeaderProps) {
  const isAuthenticated = await getIsAuthenticated();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          href={
            isAuthenticated
              ? {
                  pathname: COMMUNITY_POST_WRITE_PATHNAME,
                  query: { type: postTypeForWriteButton }, // Use prop
                }
              : {
                  pathname: `${getOrigin()}${AUTH_PATHNAME}${SIGN_IN_PATHNAME}`,
                  query: {
                    nextPathname: `${COMMUNITY_PATHNAME}${COMMUNITY_POST_WRITE_PATHNAME}?type=${postTypeForWriteButton}`, // Use prop
                  },
                }
          }
        >
          <Button>글쓰기</Button>
        </Link>
      </div>

      <div className="mb-6 text-lg text-muted-foreground">
        {description}
      </div>
    </div>
  );
}
