import client from "./meilisearchClient";
import settings from "./meilisearchSettings";
import { db } from "./db";
import { allowedDeveloperIds } from "@/allowed-developer-ids";

const seedMeilisearchWithNonPayRollDevs = async () => {
  try {
    const data = await db.developer.findMany();

    const notAllowedDevelopers = data.filter(
      (dev) => !allowedDeveloperIds.includes(dev.id),
    );

    const nonPayrollDevs = notAllowedDevelopers.map((c) => ({
      skills: c.skills,
      title: c.title,
      name: c.name,
      description: c.description,
      slug: c.slug,
      image: c.image,
      locations: c.locationPref,
      id: c.id,
    }));

    await client.deleteIndex("non-payrolled-developers");
    await client.index("non-payrolled-developers").addDocuments(nonPayrollDevs);
    await client
      .index("non-payrolled-developers")
      .updateSearchableAttributes([
        "skills",
        "locations",
        "title",
        "description",
        "name",
      ]);

    await client.index("non-payrolled-developers").updateSettings(settings);
    await client.index("non-payrolled-developers").getSettings();
  } catch (error) {
    console.error(error);
  }
};

const seedMeilisearchWithPayRollDevs = async () => {
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
    await client.index("developers").addDocuments(devs);
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
    await client.index("developers").getSettings();
  } catch (error) {
    console.error(error);
  }
};

const seedMeilisearch = async () => {
  try {
    await seedMeilisearchWithNonPayRollDevs();
    await seedMeilisearchWithPayRollDevs();
  } catch (error) {
    console.error(error);
  }
};

export default seedMeilisearch;
