import { Button } from "@pec/shared";
import Link from "next/link";

export function DiscussionsHeader() {
  return (
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
  );
}
