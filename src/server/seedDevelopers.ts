import { PrismaClient } from "@prisma/client";

import { env } from "@/env.mjs";
import type { tDevSchema } from "@/utils/zodSchema";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

const data: (tDevSchema & { userId: string })[] = [
  {
    userId: "clnyo354d000aw5zo4uq6opi3",
    name: "Jou-Fang Wang",
    phone: "+46-012-345-678",
    mail: "joufang.w@gmail.com",
    address: "Somewhere 12",
    city: "Stockholm",
    country: "Sweden",
    resume: "url",
    skills: ["JavaScript", "TypeScript", "C++", "Python"],
    description:
      "With a background in Mechatronics and Architecture, I am a detail-oriented problem solver passionate about IT. I enjoy the challenge of designing products and find being a fullstack developer to be the perfect blend of my engineering and design expertise. My multidimensional perspective enables me to approach tasks from different angles, delivering innovative and user-centric solutions. I am driven to create seamless and intuitive experiences that make a lasting impact. ",
    gitHubUrl: "https://github.com/rofunn",
    image: "https://avatars.githubusercontent.com/u/81062114?v=4",
    linkedinUrl: "https://www.linkedin.com/in/jou-fang-wang-44a14a16b/",
    title: "Fullstack JavaScript Developer",
  },
  {
    userId: "clnyo2epp0000w5zou59bw09z",
    name: "Allan Heremi",
    phone: "+46-000-111-222",
    mail: "allan.heremi@appliedtechnology.se",
    address: "Wonderland 55",
    city: "Västerås",
    country: "Sweden",
    resume: "url",
    skills: ["Javascript", "Typescript", "Solidity", "Tailwind", "React"],
    description: "I like to code, especially using React. ",
    image: "https://avatars.githubusercontent.com/u/121552608?v=4",
    gitHubUrl: "https://github.com/allanheremi",
    linkedinUrl: "https://www.linkedin.com/in/allanheremi/",
    title: "Fullstack JavaScript Developer",
  },
  {
    userId: "clnyo2nan0005w5zo5guuznus",
    name: "Rasmus Eklund",
    phone: "+46-000-111-222",
    mail: "rasmus.eklund@appliedtechnology.se",
    address: "Somewhere 15",
    city: "City",
    country: "Coutry",
    resume:
      "https://drive.google.com/file/d/1mfKGlDpMmxpFdK91YYyifK7dnsPK0ASV/view?usp=sharing",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
    ],
    description: "I like to BBQ, drink beer and code",
    image: "https://avatars.githubusercontent.com/u/49008491?v=4",
    gitHubUrl: "https://github.com/rasmus-eklund",
    linkedinUrl: "https://www.linkedin.com/in/rasmus-eklund-36348255/",
    title: "Fullstack JavaScript Developer",
  },
];

const project = {
  title: "SaltTalentPool",
  youtube: "https://www.youtube.com/embed/Qxs1acmhgUM?si=19rtmtTSruHZ1dXL",
  description: "Salt talent pool",
  githubLink: "https://github.com/rasmus-eklund/SaltTalentPool",
};

const mob = {
  name: "Developoors",
};

export const clearDatabase = async () => {
  await db.developer.deleteMany();
  await db.mob.deleteMany();
  await db.project.deleteMany();
};

export const clearUsers = async () => {
  await db.user.deleteMany();
};

const seedDevelopers = async () => {
  const { id: projectId } = await db.project.create({ data: project });
  const { id: mobId } = await db.mob.create({ data: mob });
  for (const dev of data) {
    const lastModified = new Date();
    const userId = dev.userId;
    const { id: developerId } = await db.developer.create({
      data: {
        ...dev,
        userId,
        lastModified,
      },
    });
    await db.project_developer.create({ data: { developerId, projectId } });
    await db.mob_developer.create({ data: { developerId, mobId } });
    console.log("added: ", dev.name);
  }
};

export default seedDevelopers;
