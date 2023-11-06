import { api } from "@/trpc/server";
import Developer from "../_components/profile/DeveloperItem";
import Project from "../_components/profile/ProjectItem";
import Link from "next/link";
import ItemContainer from "../_components/ItemContainer";
import MobItem from "../_components/profile/MobItem";

const Profile = async () => {
  const developer = await api.developer.getByUser.query();
  const projects = await api.project.getByDev.query();
  const mobs = await api.mob.getByDev.query();

  return (
    <div className="flex flex-col gap-2 p-4 items-center font-semibold">
      <div className="w-full gap-2 md:w-4/5 lg:w-3/5">
        <h2 className="text-xl pt-4">Developer profile:</h2>
        <ul className="font-medium">
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
        <div className="flex flex-col gap-3 w-full md:w-4/5 lg:w-3/5">
          {projects.length !== 0 && (
            <>
              <h2 className="text-xl pt-4">Your projects:</h2>
              <ul className="flex flex-col gap-1 font-medium">
                {projects.map((project) => (
                  <Project key={project.id} project={project} />
                ))}
              </ul>
            </>
          )}

          {mobs.length !== 0 && (
            <>
              <h2 className="text-xl pt-4">Your mobs:</h2>
              <ul className="flex flex-col gap-1 font-medium">
                {mobs.map((mob) => (
                  <MobItem mob={mob} key={mob.id} />
                ))}
              </ul>
            </>
          )}

          <h2 className="text-xl pt-4">Manage projects:</h2>
          <ul className="flex flex-col gap-1 font-medium">
            <Link href={`/profile/project?id=${developer.id}&do=create`}>
              <ItemContainer>Create new project</ItemContainer>
            </Link>
            <Link href={`/profile/project?id=${developer.id}&do=join`}>
              <ItemContainer>Join existing project</ItemContainer>
            </Link>
          </ul>
          <h2 className="text-xl pt-4">Manage mobs:</h2>
          <ul className="flex flex-col gap-1 font-medium">
            <Link href={`/profile/mob?id=${developer.id}&do=create`}>
              <ItemContainer>Create new mob</ItemContainer>
            </Link>
            <Link href={`/profile/mob?id=${developer.id}&do=join`}>
              <ItemContainer>Join existing mob</ItemContainer>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
