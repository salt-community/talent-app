import { z } from "zod";

export const devSchema = z.object({
  image: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  mail: z.string(),
  city: z.string(),
  address: z.string(),
  country: z.string(),
  github: z.string(),
  linkedin: z.string(),
  cv: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
  title: z.string(),
});
