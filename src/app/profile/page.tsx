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
    <main className="flex flex-col items-center gap-2 bg-gradient-to-b from-orange to-pink p-2 font-light">
      <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-3/5">
        <h2 className="pt-4 text-xl">Developer profile:</h2>
        <ul className="w-full font-medium">
          {developer ? (
            <Developer developer={developer} />
          ) : (
            <Link href={"/profile/developer"}>
              <ItemContainer>Create developer</ItemContainer>
            </Link>
          )}
        </ul>
      </div>

      {developer && (
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-3/5">
          {projects.length !== 0 && (
            <>
              <h2 className="pt-2 text-xl">Your projects:</h2>
              <ul className="flex flex-col gap-1 font-medium">
                {projects.map((project) => (
                  <Project key={project.id} project={project} />
                ))}
              </ul>
            </>
          )}

          {mobs.length !== 0 && (
            <>
              <h2 className="pt-4 text-xl">Your mobs:</h2>
              <ul className="flex flex-col gap-1 font-medium">
                {mobs.map((mob) => (
                  <MobItem mob={mob} key={mob.id} />
                ))}
              </ul>
            </>
          )}

          <h2 className="pt-4 text-xl">Manage projects:</h2>
          <ul className="flex flex-col gap-3 font-medium">
            <Link href={`/profile/project?id=${developer.id}&do=create`}>
              <ItemContainer>Create new project</ItemContainer>
            </Link>
            <Link href={`/profile/project?id=${developer.id}&do=join`}>
              <ItemContainer>Join existing project</ItemContainer>
            </Link>
          </ul>
          <h2 className="pt-4 text-xl">Manage mobs:</h2>
          <ul className="flex flex-col gap-3 font-medium">
            <Link href={`/profile/mob?id=${developer.id}&do=create`}>
              <ItemContainer>Create new mob</ItemContainer>
            </Link>
            <Link href={`/profile/mob?id=${developer.id}&do=join`}>
              <ItemContainer>Join existing mob</ItemContainer>
            </Link>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Profile;
