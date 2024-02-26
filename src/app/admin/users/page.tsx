import { api } from "@/trpc/server";
import Users from "./components/Users";
import { getServerAuthSession } from "@/server/auth";
import Navbar from "../_components/Navbar";
const page = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here!</p>
      </main>
    );
  }
  if (session && session.user.role !== "ADMIN") {
    <main className="flex grow items-center justify-center">
      <p>You are not allowed here {session.user.role}!</p>
    </main>;
  }

  const users = await api.users.getAll.query().catch((error) => {
    console.error("Error calling api.users.getAll.query():");
    console.error(error);
    return [];
  });

  return (
    <main className="flex flex-col gap-2">
      <Navbar />
      <Users users={users} />
    </main>
  );
};

export default page;
