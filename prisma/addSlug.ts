import { db } from "@/server/db";
export const addSlug = async () => {
  const devs = await db.developer.findMany();
  for (const dev of devs) {
    let slug = dev.name.toLowerCase().replace(" ", "-");
    const results = await db.developer.findMany({
      where: { slug: { equals: slug } },
    });
    if (results.length !== 0) {
      slug = crypto.randomUUID();
    }
    await db.developer.update({ where: { id: dev.id }, data: { slug } });
  }
};
