import {
  GITHUB_API_BASE_URL,
  REPO_OWNER,
  REPO_NAME,
  BRANCH,
  getGitHubHeaders,
} from "./github-config";
import { CursorRuleQueryParams, CursorRuleList } from "../model/types";

export async function getCursorRules({
  page = 1,
  per_page = 10,
}: CursorRuleQueryParams): Promise<CursorRuleList> {
  const url = `${GITHUB_API_BASE_URL}/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;

  try {
    const response = await fetch(url, {
      headers: getGitHubHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    const allRules = data.tree;

    const startIndex = (page - 1) * per_page;
    const paginatedRules = allRules.slice(startIndex, startIndex + per_page);

    return {
      rules: paginatedRules,
      total: allRules.length,
    };
  } catch (error) {
    console.error("Error fetching cursor rules:", error);
    return {
      rules: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
