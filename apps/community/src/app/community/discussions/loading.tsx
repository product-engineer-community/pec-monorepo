import { Button, PostCardSkeleton } from "@pec/shared";
import Link from "next/link";

export default function DiscussionsLoading() {
  return (
    <div className="container py-6">
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

      <div className="space-y-6">
        <PostCardSkeleton variant="discussion" count={5} />
      </div>
    </div>
  );
}
