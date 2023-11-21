import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (session && session.user.role !== "ADMIN") {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here {session.user.role}!</p>
      </main>
    );
  }
  if (!session) {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here!</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-2 p-5">
      <h1>{session.user.role}</h1>
      <Link href={"/admin/clicks"}>Client clicked on developer</Link>
      <Link href={"/admin/search"}>Client searches</Link>
      <Link href={"/admin/users"}>Manage users</Link>
    </main>
  );
};

export default Admin;
