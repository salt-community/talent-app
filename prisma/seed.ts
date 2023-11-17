// import seedMeilisearch from "@/server/seedMeilisearch";
// import { storeDataLocally, seedDataToDb } from "./backup";

// import { addSlug } from "./addSlug";

const seedData = async () => {
  // await seedMeilisearch();
  // await storeDataLocally();
  // await seedDataToDb();
  // await addSlug();
  await new Promise((resolve) => {
    resolve(console.log("No script to run."));
  });
};

seedData().catch(() => console.log("Seed failed!"));
