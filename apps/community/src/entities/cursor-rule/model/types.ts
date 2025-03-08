export interface CursorRuleItemResponse {
  mode: string;
  path: string;
  sha: string;
  size: number;
  type: "file" | "dir";
  url: string;
}

export interface CursorRuleList {
  rules: CursorRuleItemResponse[];
  total?: number;
  error?: string;
}

export interface CursorRuleQueryParams {
  page: number;
  per_page: number;
}
