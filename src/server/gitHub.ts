import {
  type TgithubResponseSchema,
  githubResponseSchema,
} from "@/utils/zodSchema";
import { TRPCError } from "@trpc/server";

export const getGithubData = async (username: string) => {
  const url = `https://api.github.com/users/${username}`;
  const response = await fetch(url);
  const data = (await response.json()) as TgithubResponseSchema;
  const parsedData = githubResponseSchema.safeParse(data);
  if (!parsedData.success) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "GitHub user not found",
    });
  }
  return { image: data.avatar_url, gitHubUrl: data.html_url };
};
