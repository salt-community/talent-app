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
    <div className="flex flex-col gap-2 p-2">
      <div className="md:w-1/2">
        <h2 className="text-xl">Developer profile:</h2>
        <ul>
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
        <div className="flex flex-col gap-2">
          {projects.length !== 0 && (
            <>
              <h2 className="text-xl">Your projects:</h2>
              <ul className="flex flex-col gap-1">
                {projects.map((project) => (
                  <Project key={project.id} project={project} />
                ))}
              </ul>
            </>
          )}

          {mobs.length !== 0 && (
            <>
              <h2 className="text-xl">Your mobs:</h2>
              <ul className="flex flex-col gap-1">
                {mobs.map((mob) => (
                  <MobItem mob={mob} key={mob.id} />
                ))}
              </ul>
            </>
          )}

          <h2 className="text-xl">Manage projects:</h2>
          <ul className="flex flex-col gap-1">
            <Link href={`/profile/project?id=${developer.id}&do=create`}>
              <ItemContainer>Create new project</ItemContainer>
            </Link>
            <Link href={`/profile/project?id=${developer.id}&do=join`}>
              <ItemContainer>Join existing project</ItemContainer>
            </Link>
          </ul>
          <h2 className="text-xl">Manage mobs:</h2>
          <ul className="flex flex-col gap-1">
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
