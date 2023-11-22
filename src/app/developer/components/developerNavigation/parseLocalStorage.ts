import { mobSchema } from "@/utils/zodSchema";
import { z } from "zod";

const parseLocalStorage = (currentSlug: string) => {
  const raw = localStorage.getItem("next-devs");
  if (!raw) {
    return { next: null, prev: null };
  }
  const parsed = z.array(mobSchema).safeParse(JSON.parse(raw));
  if (!parsed.success) {
    return { next: null, prev: null };
  }
  const currentSlugIndex = parsed.data
    .map(({ name }) => name)
    .indexOf(currentSlug);
  if (currentSlugIndex === -1) {
    return { next: null, prev: null };
  }
  const next = parsed.data[currentSlugIndex + 1];
  const prev = parsed.data[currentSlugIndex - 1];
  return { next: !!next ? next.name : null, prev: !!prev ? prev.name : null };
};

export default parseLocalStorage;
