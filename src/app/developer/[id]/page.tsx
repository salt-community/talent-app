"use client";
import UserCard from "@/app/developer/components/UserCard";
import Skills from "@/app/developer/components/Skills";
import TeamMembers from "@/app/developer/components/Team";
import { api } from "@/trpc/react";
import Projects from "@/app/developer/components/Projects";
import Contact from "@/app/developer/components/Contact";
import Icon from "@/app/assets/icons/Icon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GitHubCalendar from "../components/GitHubContributions/GitHubContributions";
import type { ReactNode } from "react";

const DeveloperPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data: developer, status } = api.developer.getBySlug.useQuery({ id });
  const { data: session } = useSession();
  const gitHubUsername = developer ? developer.gitHubUsername : null;
  const router = useRouter();
  return (
    <main
      className={`flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink pt-5 md:px-5 ${
        !session && "pb-5"
      }`}
    >
      <section className="relative flex w-full flex-col items-center gap-5 bg-gray p-5 md:max-w-5xl md:rounded-md">
        <button
          onClick={() => router.back()}
          className="absolute left-2 top-2 w-10"
        >
          <Icon icon="arrowLeft" className="h-10 fill-black" />
        </button>
        <UserCard data={{ data: developer!, status }} />
      </section>
      <section className="flex w-full grow flex-col gap-5 bg-gray px-5 pt-5 md:max-w-5xl md:rounded-md">
        <Article title="Skills">
          <Skills data={{ data: developer!, status }} />
        </Article>
        <Article title="GitHub contributions">
          <GitHubCalendar
            username={gitHubUsername}
            fontSize={16}
            colorScheme="light"
          />
        </Article>
        <Article title={developer?.title ?? "Fullstack web developer"}>
          {status === "success" && <p>{developer.description}</p>}
        </Article>
        <Article title="Projects">
          <Projects data={{ data: developer!, status }} />
        </Article>
        <Article title="Team members">
          {status === "success" && developer.mobs.length > 0 && (
            <TeamMembers mob={developer.mobs[0]!} />
          )}
        </Article>
      </section>
      {session && status === "success" && <Contact developer={developer} />}
    </main>
  );
};

type ArticleProps = { title: string; children: ReactNode };
const Article = ({ title, children }: ArticleProps) => {
  return (
    <article className="flex flex-col gap-4">
      <h2 className="text-xl font-medium md:text-3xl">{title}</h2>
      {children}
    </article>
  );
};

export default DeveloperPage;
