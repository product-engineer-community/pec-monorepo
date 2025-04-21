import { Button } from "@pec/shared";
import Link from "next/link";

export function QuestionsHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Questions</h1>
      <Link
        href={{
          pathname: "/community/create",
          query: { type: "question" },
        }}
      >
        <Button>Ask Question</Button>
      </Link>
    </div>
  );
}
