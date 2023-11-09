import type svgPaths from "@/app/assets/icons/svgPaths";

export type SearchResult = {
  skills: string[];
  title: string;
  description: string;
  name: string;
  image: string;
  id: string;
};

export type tIcon = keyof typeof svgPaths;
export type UserRole = "SALTIE" | "CLIENT" | "ADMIN";
