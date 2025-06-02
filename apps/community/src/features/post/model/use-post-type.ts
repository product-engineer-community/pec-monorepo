import { PostType, postType } from "@packages/ui";
import { useSearchParams } from "next/navigation";

export function usePostType(
  defaultType: PostType = postType.Enum.productivity, // Changed default type
): PostType {
  const searchParams = useSearchParams();
  const typeFromParams = searchParams.get("type") as PostType;

  // Check if the type from params is a valid enum value
  if (typeFromParams && Object.values(postType.Values).includes(typeFromParams)) {
    return typeFromParams; // Return valid type from params
  }

  // Otherwise, return the defaultType
  return defaultType;
}
