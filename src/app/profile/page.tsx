import { api } from "@/trpc/server";
import Developer from "../_components/profile/DeveloperItem";
import Project from "../_components/profile/ProjectItem";
import Link from "next/link";
import ItemContainer from "../_components/ItemContainer";

const Profile = async () => {
  const developer = await api.developer.getByUser.query();
  const projects = await api.project.getByDev.query();

  return (
    <div className="flex flex-col gap-2">
      <div className="md:w-1/2">
        <h2 className="text-xl">Developer profile:</h2>
        <ul>
          {developer ? (
            <Developer developer={developer} />
          ) : (
            <ItemContainer>
              <Link href={"/profile/developer"}>Create developer</Link>
            </ItemContainer>
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
          <h2 className="text-xl">Manage projects:</h2>
          <ul className="flex flex-col gap-1">
            <ItemContainer>
              <Link href={`/profile/project?id=${developer.id}&do=create`}>
                Create new project
              </Link>
            </ItemContainer>
            <ItemContainer>
              <Link href={`/profile/project?id=${developer.id}&do=join`}>
                Join existing project
              </Link>
            </ItemContainer>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
