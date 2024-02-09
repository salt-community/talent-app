import MeiliSearch from "meilisearch";
import { env } from "../env.mjs";

const msClient = new MeiliSearch({
  host: env.NEXT_MEILISEARCH_HOST,
  apiKey: env.NEXT_MEILISEARCH_MASTER_KEY,
});

export default msClient;