import { api } from "@/trpc/server";
import Users from "./components/Users";
import { getServerAuthSession } from "@/server/auth";
import NotAllowed from "../components/notAllowed";
const page = async () => {
  const session = await getServerAuthSession();
  const users = await api.users.getAll.query();
  return (
    <NotAllowed session={session}>
      <main>
        <Users users={users} />
      </main>
    </NotAllowed>
  );
};

export default page;
