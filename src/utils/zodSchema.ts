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
  locationPref: z.array(z.string()),
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

export const githubSchema = z.object({
  gitHubUrl: z.string().url(),
  image: z.string().url(),
});
export type tGithubSchema = z.infer<typeof githubSchema>;

export const skillsSchema = z.array(z.string()).min(1);
export type tSkillsSchema = z.infer<typeof skillsSchema>;

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

export const projectParams = z.object({
  id: z.string().min(1),
  do: z.enum(["create", "join"]),
});

export const mobSchema = z.object({
  name: z.string().min(2),
});

export type tMobSchema = z.infer<typeof mobSchema>;

export const searchDevSchema = z.object({ search: z.string() });
export type tSearchDevSchema = z.infer<typeof searchDevSchema>;

export const cartItem = z.object({
  developerId: z.string().min(1),
  comment: z.string().optional(),
});

export type tCartItem = z.infer<typeof cartItem>;

export const zRole = z.object({ role: z.enum(["SALTIE", "CLIENT", "ADMIN"]) });
export type tRole = z.infer<typeof zRole>;

export const zMail = z.object({ email: z.string().email() });
export type tMail = z.infer<typeof zMail>;

export const zSearchFilter = z.object({
  search: z.string(),
});
