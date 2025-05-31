import { PostType, postType } from "@packages/ui";
import { useSearchParams } from "next/navigation";

export function usePostType(
  defaultType: PostType = postType.Enum.discussion,
): PostType {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as PostType;

  if (!Object.values(postType.Values).includes(type)) {
    return type;
  }

  return defaultType;
}
