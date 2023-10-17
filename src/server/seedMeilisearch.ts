import type { Consultant } from "@/types";
import { client } from "./client";
import { data } from "./mockdata";
import settings from "./meilisearchSettings";

// eslint-disable-next-line
const populateMeilisearch = async () => {
  const devs = data.consultants.map((c: Consultant) => ({
    title: c.title,
    skills: c.skills,
    name: `${c.firstName} ${c.lastName}`,
    description: c.decription,
    id: c.id,
  }));
  client
    .index("developers")
    .addDocuments(devs)
    .then((res) => console.log(res))
    .then(() => client.index("developers").updateSettings(settings))
    .catch((err: Error) => {
      console.log(err.message);
    });
};

export default populateMeilisearch