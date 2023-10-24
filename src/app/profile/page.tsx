import { api } from "@/trpc/server";
import Developer from "../_components/profile/developer";
import Project from "../_components/profile/project";

const Profile = async () => {
  const user = await api.developer.getByUserId.query();
  const projects = await api.project.getByDev.query({developerId})

  return (
    <>
      <h2 className="text-3xl">Your developers:</h2>
      <ul>
        {users.map((user) => (
          <Developer user={user} />
        ))}
      </ul>
      <h2 className="text-3xl">Your projects:</h2>
      <ul>
        {users.map((user) => (
          <Project project={user} />
        ))}
      </ul>
    </>
  );
};

export default Profile;
