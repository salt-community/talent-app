import settings from "./meilisearchSettings";
import { db } from "./db";
import msClient from "./meilisearchClient";

const seedMeilisearch = async () => {
  console.log("Meilisearch seed was called!");
  try {
    const data = await db.developer.findMany();
    const devs = data.map((c) => ({
      skills: c.skills,
      title: c.title,
      name: c.name,
      description: c.description,
      slug: c.slug,
      image: c.image,
      locations: c.locationPref,
      id: c.id,
    }));

    await msClient.deleteIndex("developers");

    const addDocumentsResult = await msClient
      .index("developers")
      .addDocuments(devs);
    //console.log(addDocumentsResult);

    await msClient
      .index("developers")
      .updateSearchableAttributes([
        "skills",
        "locations",
        "title",
        "description",
        "name",
      ]);

    await msClient.index("developers").updateSettings(settings);

    const updatedSettings = await msClient.index("developers").getSettings();
    //console.log(updatedSettings);
  } catch (error: unknown) {
    console.error(error);
  }
};

async function checkIndexExists(indexName: string) {
  try {
    const indexes = await msClient.getIndexes();
    if (!indexes) {
      await seedMeilisearch();
      console.log("No indexes where found, Meilisearch was succesfully seeded");
      return null;
    }

    const indexExists = indexes.results.find(
      (index) => index.uid === indexName,
    );

    if (!indexExists) {
      await seedMeilisearch();
      console.log("Meilisearch was succesfully seeded");
      return null;
    }

    console.log("An index already exists, will not seed meilisearch.");
    return null;
  } catch (error) {
    console.log("Meilisearch could not be  seeded");
    console.error("Error checking index existence:", error);
    return false;
  }
}

export { seedMeilisearch, checkIndexExists };
