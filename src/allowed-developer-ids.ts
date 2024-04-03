"use server";

import { db } from "./server/db";

export const getAllowedDeveloperIds = async () => {
  const allowedDevelopers = await db.developer.findMany({
    where: { status: "PUBLISHED" },
  });
  return allowedDevelopers.map(({ id }) => id);
};
