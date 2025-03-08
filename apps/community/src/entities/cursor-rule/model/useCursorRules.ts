import { useQuery } from "@tanstack/react-query";
import { getCursorRules } from "../api/getCursorRules";
import type { CursorRuleQueryParams } from "./types";

export function useCursorRules(params: CursorRuleQueryParams) {
  return useQuery({
    queryKey: ["cursorRules", params],
    queryFn: () => getCursorRules(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
