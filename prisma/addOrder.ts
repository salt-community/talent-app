import { db } from "@/server/db";
export const addOrder = async () => {
  const projects = await db.project_developer.findMany();
  for (const project of projects) {
    await db.project_developer.update({
      where: { id: project.id },
      data: { order: 0 },
    });
  }
};
