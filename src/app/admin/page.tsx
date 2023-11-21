import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

const Admin = async () => {
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
  return (
    <main className="flex flex-col gap-2 p-5">
      <Link href={"/admin/carts"}>Client carts</Link>
      <Link href={"/admin/clicks"}>Client clicked on developer</Link>
      <Link href={"/admin/search"}>Client searches</Link>
      <Link href={"/admin/users"}>Manage users</Link>
    </main>
  );
};

export default Admin;
