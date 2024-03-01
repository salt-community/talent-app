"use client";
import { api } from "@/trpc/react";
import Developer from "./components/DeveloperItem";
import Link from "next/link";
import ItemContainer from "../_components/ItemContainer";
import MobItem from "./components/MobItem";
import Projects from "./components/dndProjects/Projects";
import { useSession } from "next-auth/react";

const Profile = () => {
  const {
    data: developer,
    isSuccess: gotDev,
    isLoading: gettingDev,
  } = api.developer.getByUser.useQuery();

  console.log("DEVELOPER: ", developer);

  const session = useSession();
  console.log("SESSION: ", session);

  return (
    <main className="flex grow flex-col items-center gap-2 bg-gradient-to-b from-orange to-pink p-2 font-light">
      <Section title={"Developer profile:"}>
        {gotDev && developer && <Developer developer={developer} />}
        {gotDev && !developer && (
          <Link href={"/profile/developer"}>
            <ItemContainer className="px-5">Create developer</ItemContainer>
          </Link>
        )}
        {gettingDev && <p>Loading...</p>}
      </Section>
      {developer && (
        <>
          {developer.projects.length !== 0 && (
            <Section title="Your projects (The order is visible in your profile)">
              <Projects data={developer.projects} />
            </Section>
          )}

          {developer.mobs.length !== 0 && (
            <Section title="Your mobs">
              {developer.mobs.map((mob) => (
                <MobItem {...mob} key={mob.id} />
              ))}
            </Section>
          )}
          <Section title="Manage projects">
            <Link href={`/profile/project?id=${developer.id}&do=create`}>
              <ItemContainer className="px-5">Create new project</ItemContainer>
            </Link>
            <Link href={`/profile/project?id=${developer.id}&do=join`}>
              <ItemContainer className="px-5">
                Join existing project
              </ItemContainer>
            </Link>
          </Section>
          <Section title="Manage mobs">
            <Link href={`/profile/mob?id=${developer.id}&do=create`}>
              <ItemContainer className="px-5">Create new mob</ItemContainer>
            </Link>
            <Link href={`/profile/mob?id=${developer.id}&do=join`}>
              <ItemContainer className="px-5">Join existing mob</ItemContainer>
            </Link>
          </Section>
        </>
      )}
    </main>
  );
};

type SectionProps = {
  title?: string;
  children?: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-3/5">
      {title && <h2 className="pt-2 text-xl">{title}</h2>}
      <ul className="flex flex-col gap-1 font-medium">{children}</ul>
    </div>
  );
};

export default Profile;
