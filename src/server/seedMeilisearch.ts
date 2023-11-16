import client from "./meilisearchClient";
import settings from "./meilisearchSettings";
import { db } from "./db";

const seedMeilisearch = async () => {
  try {
    const data = await db.developer.findMany();
    const devs = data.map((c) => ({
      skills: c.skills,
      title: c.title,
      name: c.name,
      description: c.description,
      id: c.id,
      image: c.image,
      locations: c.locationPref,
    }));

    await client.deleteIndex("developers");

    const addDocumentsResult = await client
      .index("developers")
      .addDocuments(devs);
    console.log(addDocumentsResult);

    await client
      .index("developers")
      .updateSearchableAttributes(["skills", "title", "description", "name"]);

    await client.index("developers").updateSettings(settings);

    const updatedSettings = await client.index("developers").getSettings();
    console.log(updatedSettings);
  } catch (err: unknown) {
    console.log(err);
  }
};

export default seedMeilisearch;
