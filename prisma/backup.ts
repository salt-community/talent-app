import { db } from "@/server/db";
import { readFileSync, readdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import type { UserRole } from "types";

const dataPath = "C:/Users/rasmu/Documents/GitHub/SaltTalentPool/backup/data";

type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};

const AccountsToJSON = async () => {
  const data = await db.account.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "account", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: UserRole;
  developerId: string | null;
};

const UsersToJSON = async () => {
  const data = await db.user.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "user", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

type Developer = {
  id: string;
  name: string;
  phone: string;
  mail: string;
  city: string;
  address: string;
  country: string;
  image: string;
  gitHubUrl: string;
  linkedinUrl: string;
  resume: string;
  description: string;
  skills: string[];
  title: string;
  lastModified: Date;
  cartId: string | null;
  locationPref: string[];
};

const DevsToJSON = async () => {
  const data = await db.developer.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "developer", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

type Project = {
  id: string;
  title: string;
  youtube: string;
  description: string;
  githubLink: string;
};

const ProjectsToJSON = async () => {
  const data = await db.project.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "project", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

type Mob = {
  id: string;
  name: string;
};

const MobsToJSON = async () => {
  const data = await db.mob.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "mob", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

type ProjectDev = {
  id: string;
  developerId: string;
  groupId: string;
};
const ProjectDevToJSON = async () => {
  const data = await db.project_developer.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "project_developer", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

type MobDev = {
  id: string;
  developerId: string;
  groupId: string;
};
const MobDevToJSON = async () => {
  const data = await db.mob_developer.findMany();
  for (const i of data) {
    writeFileSync(
      join(dataPath, "mob_developer", `${i.id}.json`),
      JSON.stringify(i, null, 2),
    );
  }
};

const cleanLocal = () => {
  const dirs = readdirSync(dataPath);
  for (const dir of dirs) {
    const files = readdirSync(join(dataPath, dir));
    for (const file of files) {
      unlinkSync(join(dataPath, dir, file));
    }
  }
};

export const storeDataLocally = async () => {
  cleanLocal();
  await AccountsToJSON();
  await UsersToJSON();
  await DevsToJSON();
  await ProjectsToJSON();
  await MobsToJSON();
  await ProjectDevToJSON();
  await MobDevToJSON();
};

const seedMobs = async () => {
  await db.mob.deleteMany();
  const files = readdirSync(join(dataPath, "mob"));
  for (const file of files) {
    const rawString = readFileSync(join(dataPath, "mob", file)).toString();
    const data = JSON.parse(rawString) as Mob;
    await db.mob.create({ data });
  }
};

const seedProjects = async () => {
  await db.project.deleteMany();
  const files = readdirSync(join(dataPath, "project"));
  for (const file of files) {
    const rawString = readFileSync(join(dataPath, "project", file)).toString();
    const data = JSON.parse(rawString) as Project;
    await db.project.create({ data });
  }
};

const seedDevelopers = async () => {
  await db.developer.deleteMany();
  const files = readdirSync(join(dataPath, "developer"));
  for (const file of files) {
    const rawString = readFileSync(
      join(dataPath, "developer", file),
    ).toString();
    const data = JSON.parse(rawString) as Developer;
    await db.developer.create({ data });
  }
};
const seedMobDevelopers = async () => {
  await db.mob_developer.deleteMany();
  const files = readdirSync(join(dataPath, "mob_developer"));
  for (const file of files) {
    const rawString = readFileSync(
      join(dataPath, "mob_developer", file),
    ).toString();
    const data = JSON.parse(rawString) as MobDev;
    await db.mob_developer.create({ data });
  }
};
const seedProjectDevelopers = async () => {
  await db.project_developer.deleteMany();
  const files = readdirSync(join(dataPath, "project_developer"));
  for (const file of files) {
    const rawString = readFileSync(
      join(dataPath, "project_developer", file),
    ).toString();
    const data = JSON.parse(rawString) as ProjectDev;
    await db.project_developer.create({ data });
  }
};
const seedUser = async () => {
  await db.user.deleteMany();
  const files = readdirSync(join(dataPath, "user"));
  for (const file of files) {
    const rawString = readFileSync(join(dataPath, "user", file)).toString();
    const data = JSON.parse(rawString) as User;
    await db.user.create({ data });
  }
};

const seedAccounts = async () => {
  await db.account.deleteMany();
  const files = readdirSync(join(dataPath, "account"));
  for (const file of files) {
    const rawString = readFileSync(join(dataPath, "account", file)).toString();
    const data = JSON.parse(rawString) as Account;
    await db.account.create({ data });
  }
};
export const seedDataToDb = async () => {
  await seedMobs();
  await seedProjects();
  await seedDevelopers();
  await seedMobDevelopers();
  await seedProjectDevelopers();
  await seedUser();
  await seedAccounts();
};
