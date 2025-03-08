export const GITHUB_API_BASE_URL = "https://api.github.com/repos";
export const REPO_OWNER = "boaz-hwang";
export const REPO_NAME = "boaz-hwang.github.io";
export const BRANCH = "main";

export const getGitHubHeaders = () => ({
  Accept: "application/vnd.github.v3+json",
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
});
