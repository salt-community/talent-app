import client from "./meilisearchClient";
import settings from "./meilisearchSettings";
import type { Developer } from "@prisma/client";
import { db } from "./db";

// eslint-disable-next-line
const seedMeilisearch = async () => {
  const data = await db.developer.findMany();
  const devs = data.map((c: Developer) => ({
    title: c.title,
    skills: c.skills,
    name: `${c.firstName} ${c.lastName}`,
    description: c.description,
    id: c.id,
  }));
  client
    .index("developers")
    .addDocuments(devs)
    .then((res) => console.log(res))
    .then(() => client.index("developers").updateSettings(settings))
    .catch((err: Error) => {
      console.log(err.message);
    });
};

export default seedMeilisearch;
