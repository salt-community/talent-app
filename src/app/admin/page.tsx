import Link from "next/link";
import NotAllowed from "./components/notAllowed";
import { getServerAuthSession } from "@/server/auth";

const Admin = async () => {
  const session = await getServerAuthSession();
  return (
    <main className="flex flex-col gap-2 p-5">
      <NotAllowed session={session}>
        <Link href={"/admin/clicks"}>Client clicked on developer</Link>
        <Link href={"/admin/search"}>Client searches</Link>
        <Link href={"/admin/users"}>Manage users</Link>
      </NotAllowed>
    </main>
  );
};

export default Admin;
