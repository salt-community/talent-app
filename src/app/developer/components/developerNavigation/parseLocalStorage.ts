import { localStorageSchema } from "@/utils/zodSchema";

type ParsedLocalStorage = {
  next: string | null;
  prev: string | null;
  search: string;
  scrollPosition: number;
};

const parseLocalStorage = (currentSlug: string): ParsedLocalStorage => {
  const empty = { next: null, prev: null, search: "", scrollPosition: 0 };
  const raw = localStorage.getItem("next-devs");
  if (!raw) {
    return empty;
  }
  const parsed = localStorageSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    console.log(parsed.error.message);
    return empty;
  }
  console.log("went here");
  const currentSlugIndex = parsed.data.devs
    .map(({ slug }) => slug)
    .indexOf(currentSlug);
  if (currentSlugIndex === -1) {
    return empty;
  }
  const next = parsed.data.devs[currentSlugIndex + 1];
  const prev = parsed.data.devs[currentSlugIndex - 1];
  const { search, scrollPosition } = parsed.data;
  console.log(parsed.data);
  return {
    next: !!next ? next.slug : null,
    prev: !!prev ? prev.slug : null,
    search,
    scrollPosition,
  };
};

export default parseLocalStorage;
