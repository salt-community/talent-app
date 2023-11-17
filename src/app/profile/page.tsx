"use client";
import { api } from "@/trpc/react";
import Developer from "./components/DeveloperItem";
import Link from "next/link";
import ItemContainer from "../_components/ItemContainer";
import MobItem from "./components/MobItem";
import Projects from "./components/dndProjects/Projects";

const Profile = () => {
  const {
    data: developer,
    isSuccess: gotDev,
    isLoading: gettingDev,
  } = api.developer.getByUser.useQuery();
  const {
    data: projects,
    isSuccess: gotProjects,
    isLoading: gettingProjects,
  } = api.project.getByDev.useQuery();
  const {
    data: mobs,
    isSuccess: gotMobs,
    isLoading: gettingMobs,
  } = api.mob.getByDev.useQuery();

  return (
    <main className="flex grow flex-col items-center gap-2 bg-gradient-to-b from-orange to-pink p-2 font-light">
      <Section title={"Developer profile:"}>
        {gotDev && (
          <>
            {developer ? (
              <Developer developer={developer} />
            ) : (
              <Link href={"/profile/developer"}>
                <ItemContainer className="px-5">Create developer</ItemContainer>
              </Link>
            )}
          </>
        )}
        {gettingDev && <p>Loading...</p>}
      </Section>
      {developer && (
        <>
          {gotProjects && projects.length !== 0 && (
            <Section title="Your projects">
              {/* {projects.map((project) => (
                <Project key={project.id} project={project} />
              ))} */}
            <Projects data={projects} />
            </Section>
          )}
          {gettingProjects && <p>Loading...</p>}
          {gotMobs && mobs.length !== 0 && (
            <Section title="Your mobs">
              {mobs.map((mob) => (
                <MobItem mob={mob} key={mob.id} />
              ))}
            </Section>
          )}
          {gettingMobs && <p>Loading...</p>}
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
