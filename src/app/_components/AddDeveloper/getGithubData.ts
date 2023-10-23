import {
  type tGithubResponseSchema,
  githubResponseSchema,
} from "@/utils/zodSchema";
import toast from "react-hot-toast";

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
