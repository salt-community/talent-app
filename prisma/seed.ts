import seedDevelopers from "@/server/mockdata";
import seedMeilisearch from "@/server/seedMeilisearch";

const seedData = async () => {
  await seedDevelopers();
  await seedMeilisearch();
};

seedData()
  .then(() => console.log("Successfully seeded developers and meilisearch"))
  .catch(() => console.log("Seed failed"));
