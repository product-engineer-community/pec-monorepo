import { type PostType } from "@packages/ui";
import { useSearchParams } from "next/navigation";

export function usePostType(defaultType: PostType = "discussion"): PostType {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (type === "discussion" || type === "question" || type === "article") {
    return type;
  }

  return defaultType;
}
