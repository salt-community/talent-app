"use client";
import Link from "next/link";
import UserCard from "@/app/_components/developer/UserCard";
import SectionHeader from "@/app/_components/SectionHeader";
import Skills from "@/app/_components/developer/DeveloperSkills";
import TeamMembers from "@/app/_components/developer/Team";
import { api } from "@/trpc/react";
import Projects from "@/app/_components/developer/Projects";
import Contact from "@/app/_components/developer/Contact";
import Icon from "@/app/assets/icons/Icon";
import { useSession } from "next-auth/react";
const DeveloperPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: developer,
    isSuccess,
  } = api.developer.getById.useQuery({ id });
  const { data: session } = useSession();
  return (
    <main className="flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink px-5 pt-5 md:pt-0">
      <div className="flex w-full flex-col gap-5 rounded-md bg-gray p-5 md:max-w-5xl md:rounded-none items-center">
        <Link href={"/"} className="absolute left-2 top-16 z-10 w-10">
          <Icon
            icon="arrowLeft"
            className="h-10 rounded-full border border-black/30 bg-black fill-white active:bg-black/30"
          />
        </Link>
        {isSuccess && <UserCard developer={developer} />}
      </div>
      <div className="relative w-full flex flex-col gap-5 rounded-md bg-gray px-5 pt-5 md:max-w-5xl md:rounded-none">
        {isSuccess && <Bio {...developer} />}
        {session ? (
          <>
            {isSuccess && <Skills skills={developer.skills} />}
            {isSuccess && <Projects projects={developer.projects} />}
            {isSuccess && <TeamMembers mobs={developer.mobs} />}
          </>
        ) : (
          <div>
            <Link className="underline" href="/login">
              Sign in
            </Link>
            <span className="ml-1">to see more...</span>
          </div>
        )}
        {session && isSuccess && <Contact developer={developer} />}
      </div>
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
