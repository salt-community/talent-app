import { api } from "@/trpc/server";
import Developer from "../_components/profile/Developer";
import Project from "../_components/profile/Project";
import Container from "../_components/Container";
import Link from "next/link";

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
            <Container>
              <Link href={"/profile/developer"}>Create developer</Link>
            </Container>
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
            <Container>
              <Link href={`/profile/project?id=${developer.id}&do=create`}>
                Create new project
              </Link>
            </Container>
            <Container>
              <Link href={`/profile/project?id=${developer.id}&do=join`}>
                Join existing project
              </Link>
            </Container>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
