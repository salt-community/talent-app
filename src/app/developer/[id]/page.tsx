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

import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
const DeveloperPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: developer,
    isSuccess,
    isLoading,
  } = api.developer.getById.useQuery({ id });
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <main className="flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink px-5 pt-5">
      <div className="relative flex w-full flex-col items-center gap-5 rounded-md bg-gray p-5 md:max-w-5xl">
        <button
          onClick={() => router.back()}
          className="absolute left-2 top-2 w-10"
        >
          <Icon
            icon="arrowLeft"
            className="h-10 w-14 rounded-full border border-black/30 bg-black fill-white active:bg-black/30"
          />
        </button>
        {isSuccess && <UserCard developer={developer} />}
        {isLoading && <UserCardShimmer />}
      </div>
      <div className="flex w-full flex-col gap-5 rounded-md bg-gray px-5 pt-5 md:max-w-5xl grow">
        {isSuccess && <Bio {...developer} />}
        {isLoading && <DeveloperCardShimmer />}
        {session ? (
          <>
            {isSuccess && <Skills skills={developer.skills} />}
            {isSuccess && <Projects projects={developer.projects} />}
            {isSuccess && <TeamMembers mobs={developer.mobs} />}
          </>
        ) : (
          <div className="mb-2">
            <span className="ml-1 text-lg font-medium">To see more...</span>
            <Button callToAction onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </div>
        )}
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
