import type svgPaths from "@/app/assets/icons/svgPaths";

export type SearchResult = {
  skills: string[];
  title: string;
  description: string;
  name: string;
  image: string;
  slug: string;
  id: string;
};

export type tIcon = keyof typeof svgPaths;
export type UserRole = "SALTIE" | "CLIENT" | "ADMIN";
export type Status = "error" | "loading" | "success";

type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error" };
export type LoadingProps<T> = {
  data: LoadingState | SuccessState<T> | ErrorState;
};
