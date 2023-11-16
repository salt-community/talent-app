// import seedMeilisearch from "@/server/seedMeilisearch";
import { storeDataLocally, seedDataToDb } from "./backup";

const seedData = async () => {
  // await seedMeilisearch();
  await storeDataLocally();
  // await seedDataToDb();
};

seedData()
  .then(() => console.log("Seed successs!"))
  .catch(() => console.log("Seed failed!"));
