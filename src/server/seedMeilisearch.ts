import client from "./meilisearchClient";
import settings from "./meilisearchSettings";
import { db } from "./db";

const seedMeilisearch = async () => {
  const data = await db.developer.findMany();
  const devs = data.map((c) => ({
    title: c.title,
    skills: c.skills,
    name: c.name,
    description: c.description,
    id: c.id,
  }));
  console.log(devs);
  client
    .deleteIndex("developers")
    .then(() => {
      client
        .index("developers")
        .addDocuments(devs)
        .then((res) => console.log(res))
        .then(() => client.index("developers").updateSettings(settings))
        .catch((err: Error) => {
          console.log(err.message);
        });
    })
    .catch((err: Error) => {
      console.log(err.message);
    });
};

export default seedMeilisearch;
