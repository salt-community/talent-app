import { z } from "zod";

export const devSchema = z.object({
  name: z.string().min(2, "Provide a name"),
  phone: z.string().min(2),
  mail: z.string().email("Not valid mail"),
  city: z.string().min(2),
  address: z.string().min(2),
  country: z.string().min(2),
  linkedinUrl: z.string().url(),
  resume: z.string().url(),
  title: z.string().min(2),
  description: z.string().min(2),
  skills: z.array(z.string()).min(1),
  gitHubUrl: z.string().url(),
  image: z.string().url(),
});
export type tDevSchema = z.infer<typeof devSchema>;

export const devSchemaPartial = z.object({
  name: z.string().min(2, "Provide a name"),
  phone: z.string().min(2),
  mail: z.string().email("Not valid mail"),
  city: z.string().min(2),
  address: z.string().min(2),
  country: z.string().min(2),
  linkedinUrl: z.string().url(),
  resume: z.string().url(),
  title: z.string().min(2),
  description: z.string().min(2),
});
export type tDevSchemaPartial = z.infer<typeof devSchemaPartial>;

export const githubSkillsSchema = z.object({
  skills: z.array(z.string()).min(1),
  gitHubUrl: z.string().url(),
  image: z.string().url(),
});

export type tGithubSkillsSchema = z.infer<typeof githubSkillsSchema>;

export const githubResponseSchema = z.object({
  avatar_url: z.string().url(),
  html_url: z.string().url(),
});
export type tGithubResponseSchema = z.infer<typeof githubResponseSchema>;

export const projectSchema = z.object({
  title: z.string().min(2),
  youtube: z.string().min(2),
  description: z.string().min(2),
  githubLink: z.string().url(),
});
export type tProjectSchema = z.infer<typeof projectSchema>;
