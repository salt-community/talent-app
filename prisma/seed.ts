// import seedMeilisearch from "@/server/seedMeilisearch";
// import { storeDataLocally, seedDataToDb } from "./backup";

const seedData = async () => {
  // await seedMeilisearch();
  // await storeDataLocally();
  // await seedDataToDb();
  await new Promise((resolve) => {
    resolve(console.log("No script to run."));
  });
};

seedData().catch(() => console.log("Seed failed!"));
