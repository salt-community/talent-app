import { db } from "@/server/db";
export const addSlug = async () => {
  const devs = await db.developer.findMany();
  for (const dev of devs) {
    const slug = dev.name.toLowerCase().replace(/[^a-zA-Z]+/g, "-");
    await db.developer.update({ where: { id: dev.id }, data: { slug } });
  }
};
