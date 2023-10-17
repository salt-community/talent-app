import MeiliSearch from "meilisearch";
import { env } from "../env.mjs";

const client = new MeiliSearch({
  host: env.NEXT_MEILISEARCH_HOST,
  apiKey: env.NEXT_MEILISEARCH_KEY,
});

export default client;