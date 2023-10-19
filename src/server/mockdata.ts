import { PrismaClient } from "@prisma/client";

import { env } from "@/env.mjs";

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

const data = [
  {
    userId: "clnxa4z810000qo4vnlexks3s",
    image: "https://avatars.githubusercontent.com/u/81062114?v=4",
    firstName: "Jou-Fang",
    lastName: "Wang",
    phone: "+46-012-345-678",
    mail: "joufang.w@gmail.com",
    address: "Somewhere 12",
    city: "Stockholm",
    country: "Sweden",
    cv: "url",
    skills: ["JavaScript", "TypeScript", "C++", "Python"],
    decription:
      "With a background in Mechatronics and Architecture, I am a detail-oriented problem solver passionate about IT. I enjoy the challenge of designing products and find being a fullstack developer to be the perfect blend of my engineering and design expertise. My multidimensional perspective enables me to approach tasks from different angles, delivering innovative and user-centric solutions. I am driven to create seamless and intuitive experiences that make a lasting impact. ",
    github: "https://github.com/rofunn",
    linkedin: "https://www.linkedin.com/in/jou-fang-wang-44a14a16b/",
    title: "Fullstack JavaScript Developer",
  },
  {
    userId: "clnxa3qc20000phqctzbu1hil",
    image: "https://avatars.githubusercontent.com/u/121552608?v=4",
    firstName: "Allan",
    lastName: "Heremi",
    phone: "+46-000-111-222",
    mail: "allan.heremi@appliedtechnology.se",
    address: "Wonderland 55",
    city: "Västerås",
    country: "Sweden",
    cv: "url",
    skills: ["Javascript", "Typescript", "Solidity", "Tailwind", "React"],
    decription: "I like to code, especially using React. ",
    github: "https://github.com/allanheremi",
    linkedin: "https://www.linkedin.com/in/allanheremi/",
    title: "Fullstack JavaScript Developer",
  },
  {
    userId: "clnx9xkk40000w548wpakrywb",
    image: "https://avatars.githubusercontent.com/u/49008491?v=4",
    firstName: "Rasmus",
    lastName: "Eklund",
    phone: "+46-000-111-222",
    mail: "rasmus.eklund@appliedtechnology.se",
    address: "Somewhere 15",
    city: "City",
    country: "Coutry",
    cv: "https://drive.google.com/file/d/1mfKGlDpMmxpFdK91YYyifK7dnsPK0ASV/view?usp=sharing",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
    ],
    decription: "I like to BBQ, drink beer and code",
    github: "https://github.com/rasmus-eklund",
    linkedin: "https://www.linkedin.com/in/rasmus-eklund-36348255/",
    title: "Fullstack JavaScript Developer",
  },
];

export const seed = async () => {
  for (const dev of data) {
    const lastModified = new Date();
    const userId = dev.userId;
    await db.developer.create({
      data: { ...dev, lastModified, userId },
    });
    console.log("added: ", dev.firstName);
  }
};
