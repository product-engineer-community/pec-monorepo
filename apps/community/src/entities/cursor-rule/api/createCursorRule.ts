import {
  getGitHubHeaders,
  GITHUB_API_BASE_URL,
  REPO_OWNER,
  REPO_NAME,
  BRANCH,
} from "./github-config";

interface CreateCursorRuleParams {
  path: string;
  content: string;
}

export async function createCursorRule({
  path,
  content,
}: CreateCursorRuleParams) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      {
        method: "PUT",
        headers: getGitHubHeaders(),
        body: JSON.stringify({
          message: `Add cursor rule: ${path}`,
          content: Buffer.from(content).toString("base64"),
          branch: BRANCH,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create cursor rule");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: "Failed to create cursor rule" };
  }
}
