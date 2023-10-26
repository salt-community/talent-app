import {
  type tGithubResponseSchema,
  githubResponseSchema,
} from "@/utils/zodSchema";

export const getGithubData = async (username: string) => {
  const url = `https://api.github.com/users/${username}`;
  const response = await fetch(url);
  const data = (await response.json()) as tGithubResponseSchema;
  const parsedData = githubResponseSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Incorrect github name");
  }
  return { image: data.avatar_url, gitHubUrl: data.html_url };
};

export const getGitHubUsername = (gitHubLink: string): string | null => {
  const regex = /github\.com\/([^/]+)\/?/;
  const match = gitHubLink.match(regex);
  if (match?.[1]) {
    return match[1];
  } else {
    return null;
  }
};
