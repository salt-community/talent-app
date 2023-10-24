import { api } from "@/trpc/server";
import Developer from "../_components/profile/developer";
import Project from "../_components/profile/project";
import Container from "../_components/container";
import Link from "next/link";

const Profile = async () => {
  const developer = await api.developer.getByUser.query();
  const projects = await api.project.getByDev.query();

  return (
    <div className="flex gap-2">
      <div className="w-1/2">
        <h2 className="text-3xl">Your developers:</h2>
        <ul>
          {developer ? (
            <Developer developer={developer} />
          ) : (
            <Container>
              <button>Create developer</button>
            </Container>
          )}
        </ul>
      </div>
      <div className="w-1/2">
        <h2 className="text-3xl">Your projects:</h2>
        <ul className="flex flex-col gap-1">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
          <Container>
            <Link href={"/profile/project"}>Create new project</Link>
          </Container>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
