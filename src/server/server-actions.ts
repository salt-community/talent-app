"use server";
import { data } from "./mockdata.js";
import type { Consultant, SearchResult } from "types";
import client from "./meilisearchClient";

// eslint-disable-next-line
export const getUser = async (id: string): Promise<Consultant> => {
  // fetch
  return data.consultants.find((c) => c.id === id)!;
};

// eslint-disable-next-line
export const getAllUsers = async () => {
  return data.consultants;
};

// eslint-disable-next-line
export const getUsersById = async (ids: string[]) => {
  return data.consultants.filter((consultant) =>
    ids.some((id) => consultant.id === id),
  );
};

export const queryConsultants = async (text: string) => {
  const res = await client.index("developers").search(text);
  const searchData = res.hits as SearchResult[];
  return await getUsersById(searchData.map((consultant) => consultant.id));
};
