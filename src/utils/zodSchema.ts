import { z } from "zod";

export const devSchema = z.object({
  name: z.string(),
  phone: z.string(),
  mail: z.string(),
  city: z.string(),
  address: z.string(),
  country: z.string(),
  image: z.string().url(),
  gitHubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  resume: z.string().url(),
  description: z.string(),
  skills: z.array(z.string()),
  title: z.string(),
});
export type TDevSchema = z.infer<typeof devSchema>;

export const devInputSchema = z.object({
  name: z.string(),
  phone: z.string(),
  mail: z.string(),
  city: z.string(),
  address: z.string(),
  country: z.string(),
  gitHubUserName: z.string(),
  linkedinUrl: z.string().url(),
  resume: z.string().url(),
  description: z.string(),
  skills: z.array(z.string()),
  title: z.string(),
});
export type TdevInputSchema = z.infer<typeof devInputSchema>;

export const githubResponseSchema = z.object({
  avatar_url: z.string().url(),
  html_url: z.string().url(),
});
export type TgithubResponseSchema = z.infer<typeof githubResponseSchema>;
