import seedDevelopers, { clearDatabase } from "@/server/seedDevelopers";
import seedMeilisearch from "@/server/seedMeilisearch";

const seedData = async () => {
  await clearDatabase();
  await seedDevelopers();
  await seedMeilisearch();
};

seedData()
  .then(() => console.log("Successfully seeded developers and meilisearch"))
  .catch(() => console.log("Seed failed"));
