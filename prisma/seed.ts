// import seedMeilisearch from "@/server/seedMeilisearch";
import { storeDataLocally, seedDataToDb } from "./backup";

// import { addOrder } from "./addOrder";

// import { addSlug } from "./addSlug";

const seedData = async () => {
  // await seedMeilisearch();
  // await storeDataLocally();
  // await seedDataToDb();
  // await addSlug();
  // await addOrder();
  await new Promise((resolve) => {
    resolve(console.log("No script to run."));
  });
};

seedData().catch((e) => {
  console.error("Seed failed!");
  console.error(e);
});
