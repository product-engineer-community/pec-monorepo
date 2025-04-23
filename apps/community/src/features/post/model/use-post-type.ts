import { type PostType } from "@pec/shared";
import { useSearchParams } from "next/navigation";

export function usePostType(defaultType: PostType = "discussion"): PostType {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  
  if (type === "discussion" || type === "question" || type === "post") {
    return type;
  }
  
  return defaultType;
}
