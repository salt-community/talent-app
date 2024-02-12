import MeiliSearch from "meilisearch";
import { env } from "../env.mjs";

const createApiKey = async () => {
  const client = new MeiliSearch({
    host: env.NEXT_MEILISEARCH_HOST,
    apiKey: env.NEXT_MEILISEARCH_MASTER_KEY,
  });
  //console.log("CLIENT", client);
  try {
    const keys = await client.getKeys();
    // const newApiKey = await client.createKey({
    //   description: "Search developers",
    //   actions: ["search"],
    //   indexes: ["developers"],
    //   expiresAt: null,
    // });
    // console.log(newApiKey)
    console.log(keys.results);
  } catch (error) {
    console.log("ERROR!!: ", error);
  }
};

export default createApiKey;
