"use client";
import UserCard from "@/app/developer/components/UserCard";
import Skills from "@/app/developer/components/Skills";
import TeamMembers from "@/app/developer/components/Team";
import { api } from "@/trpc/react";
import Projects from "@/app/developer/components/Projects";
import Contact from "@/app/developer/components/Contact";
import Icon from "@/app/assets/icons/Icon";
import { useSession } from "next-auth/react";
import UserCardShimmer from "../components/shimmer/UserCardShimmer";
import { useRouter } from "next/navigation";
import GitHubCalendar from "../components/GitHubContributions/GitHubContributions";
import SkillsShimmer from "../components/shimmer/SkillsShimmer";
import type { ReactNode } from "react";
import GitHubShimmer from "../components/shimmer/GitHubShimmer";

const DeveloperPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: developer,
    isSuccess,
    isLoading,
  } = api.developer.getBySlug.useQuery({ id });
  const { data: session } = useSession();
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
        {isSuccess && <UserCard developer={developer} />}
        {isLoading && <UserCardShimmer />}
      </section>
      <section className="flex w-full grow flex-col gap-5 bg-gray px-5 pt-5 md:max-w-5xl md:rounded-md">
        <Article title="Skills">
          {isSuccess && <Skills skills={developer.skills} />}
          {isLoading && <SkillsShimmer />}
        </Article>
        <Article title="GitHub contributions">
          {isSuccess && developer.gitHubUsername && (
            <>
              <GitHubCalendar
                username={developer.gitHubUsername}
                fontSize={16}
                colorScheme="light"
              />
            </>
          )}
          {isLoading && <GitHubShimmer />}
        </Article>
        <Article title={developer?.title ?? "Fullstack web developer"}>
          {isSuccess && <p>{developer.description}</p>}
        </Article>
        <Article title="Projects">
          {isSuccess && <Projects projects={developer.projects} />}
        </Article>
        <Article title="Team members">
          {isSuccess && developer.mobs.length > 0 && (
            <TeamMembers mob={developer.mobs[0]!} />
          )}
        </Article>
      </section>
      {session && isSuccess && <Contact developer={developer} />}
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
