import { z } from "zod";

export const devSchema = z.object({
  name: z.string().min(2, "Provide a name"),
  phone: z.string().min(2, "Provide a phone number"),
  mail: z.string().email("Not valid mail"),
  city: z.string().min(2),
  address: z.string().min(2),
  country: z.string().min(2),
  linkedinUrl: z.string().url(),
  resume: z.string().url(),
  title: z.string().min(2),
  description: z.string().min(2),
  skills: z
    .array(z.object({ skill: z.string().min(1) }))
    .min(1, "Minimum one skill")
    .refine((i) => new Set(i).size === i.length, {
      message: "Skills must be unique!",
    }),
  gitHubUrl: z.string().url(),
  image: z.string().url(),
  locationPref: z
    .array(z.object({ location: z.string().min(1) }))
    .min(1, "Minimum one location")
    .max(3)
    .refine((i) => new Set(i).size === i.length, {
      message: "Locations must be unique!",
    }),
});
export type tDevSchema = z.infer<typeof devSchema>;

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
