import client from "./meilisearchClient";
import settings from "./meilisearchSettings";
import { db } from "./db";
import { allowedDeveloperIds } from "@/allowed-developer-ids";

const seedMeilisearch = async () => {
  try {
    const data = await db.developer.findMany();

    const allowedDevelopers = data.filter((dev) =>
      allowedDeveloperIds.includes(dev.id),
    );

    const devs = allowedDevelopers.map((c) => ({
      skills: c.skills,
      title: c.title,
      name: c.name,
      description: c.description,
      slug: c.slug,
      image: c.image,
      locations: c.locationPref,
      id: c.id,
    }));

    await client.deleteIndex("developers");

    const addDocumentsResult = await client
      .index("developers")
      .addDocuments(devs);
    console.log(addDocumentsResult);

    await client
      .index("developers")
      .updateSearchableAttributes([
        "skills",
        "locations",
        "title",
        "description",
        "name",
      ]);

    await client.index("developers").updateSettings(settings);

    const updatedSettings = await client.index("developers").getSettings();
    console.log(updatedSettings);
  } catch (err: unknown) {
    console.log(err);
  }
};

export default seedMeilisearch;
