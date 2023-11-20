"use client";
import UserCard from "@/app/developer/components/UserCard";
import SectionHeader from "@/app/developer/components/SectionHeader";
import Skills from "@/app/developer/components/Skills";
import TeamMembers from "@/app/developer/components/Team";
import { api } from "@/trpc/react";
import Projects from "@/app/developer/components/Projects";
import Contact from "@/app/developer/components/Contact";
import Icon from "@/app/assets/icons/Icon";
import { useSession } from "next-auth/react";
import UserCardShimmer from "../components/shimmer/UserCardShimmer";
import DeveloperCardShimmer from "../components/shimmer/DeveloperCardShimmer";
import { useRouter } from "next/navigation";
import GitHubCalendar from "../components/GitHubContributions/GitHubContributions";

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
      <div className="relative flex w-full flex-col items-center gap-5 bg-gray p-5 md:max-w-5xl md:rounded-md">
        <button
          onClick={() => router.back()}
          className="absolute left-2 top-2 w-10"
        >
          <Icon icon="arrowLeft" className="h-10 fill-black" />
        </button>
        {isSuccess && <UserCard developer={developer} />}
        {isLoading && <UserCardShimmer />}
      </div>
      <div className="flex w-full grow flex-col gap-5 bg-gray px-5 pt-5 md:max-w-5xl md:rounded-md">
        {isSuccess && <Skills skills={developer.skills} />}
        {isSuccess && <Bio {...developer} />}
        {isLoading && <DeveloperCardShimmer />}
        {isSuccess && <Projects projects={developer.projects} />}
        {isSuccess && developer.gitHubUsername && (
          <>
            <SectionHeader title="Github contributions" />
            <GitHubCalendar
              username={developer.gitHubUsername}
              fontSize={16}
              colorScheme="light"
            />
          </>
        )}
        {isSuccess && <TeamMembers mobs={developer.mobs} />}
      </div>
      {session && isSuccess && <Contact developer={developer} />}
    </main>
  );
};

type BioProps = { title: string; description: string };
const Bio = ({ title, description }: BioProps) => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title={title} />
      <p>{description}</p>
    </section>
  );
};

export default DeveloperPage;
