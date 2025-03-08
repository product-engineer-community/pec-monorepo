import {
  getGitHubHeaders,
  GITHUB_API_BASE_URL,
  REPO_OWNER,
  REPO_NAME,
  BRANCH,
} from "./github-config";

export async function getCursorRuleContent(path: string) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
      {
        headers: getGitHubHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const content = atob(data.content);
    return { content };
  } catch (error) {
    return { error: "Failed to fetch cursor rule content" };
  }
}
