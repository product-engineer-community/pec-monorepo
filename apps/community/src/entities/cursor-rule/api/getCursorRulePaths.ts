import {
  GITHUB_API_BASE_URL,
  REPO_OWNER,
  REPO_NAME,
  getGitHubHeaders,
} from "./github-config";

export async function getCursorRulePaths() {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/${REPO_OWNER}/${REPO_NAME}/contents`,
      {
        headers: getGitHubHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cursor rule paths");
    }

    const contents = await response.json();
    const paths = contents
      .filter(
        (content: any) =>
          content.type === "file" && content.name.endsWith(".cursorrules"),
      )
      .map((content: any) => content.path);

    return { paths };
  } catch (error) {
    return { error: "Failed to fetch cursor rule paths" };
  }
}
