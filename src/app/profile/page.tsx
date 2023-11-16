import { api } from "@/trpc/server";
import Developer from "./components/DeveloperItem";
import Project from "./components/ProjectItem";
import Link from "next/link";
import ItemContainer from "../_components/ItemContainer";
import MobItem from "./components/MobItem";

const Profile = async () => {
  const developer = await api.developer.getByUser.query();
  const projects = await api.project.getByDev.query();
  const mobs = await api.mob.getByDev.query();

  return (
    <main className="flex flex-col grow items-center gap-2 bg-gradient-to-b from-orange to-pink p-2 font-light">
      <Section title={"Developer profile:"}>
        {developer ? (
          <Developer developer={developer} />
        ) : (
          <Link href={"/profile/developer"}>
            <ItemContainer className="px-5">Create developer</ItemContainer>
          </Link>
        )}
      </Section>
      {developer && (
        <>
          <Section title="Your projects">
            {projects.length !== 0 &&
              projects.map((project) => (
                <Project key={project.id} project={project} />
              ))}
          </Section>
          <Section title="Your mobs">
            {mobs.length !== 0 &&
              mobs.map((mob) => <MobItem mob={mob} key={mob.id} />)}
          </Section>
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
