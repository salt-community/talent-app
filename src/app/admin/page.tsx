import { api } from "@/trpc/server";
import EditUserRole from "../_components/admin/EditUserRoles";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import type { RouterOutputs } from "@/trpc/shared";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  if (session.user.role !== "ADMIN") {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here {session.user.role}!</p>
      </main>
    );
  }
  const clicks = await api.log.getClicks.query();
  const searches = await api.log.getSearch.query();
  const users = await api.users.getAll.query();

  return (
    <main className="flex flex-col gap-2 p-5">
      <ClickedTable clicks={clicks} />
      <SearchTable searches={searches} />
      <section>
        <h2>Users</h2>
        <ul className="flex flex-col gap-1">
          {users.map((user) => (
            <EditUserRole key={user.id} user={user} />
          ))}
        </ul>
      </section>
    </main>
  );
};

type Clicks = RouterOutputs["log"]["getClicks"][number];
type ClickedProps = { clicks: Clicks[] };
const ClickedTable = ({ clicks }: ClickedProps) => {
  return (
    <section className="flex flex-col">
      <h2>Clicked on developers</h2>
      <table className="border-collapse border">
        <thead>
          <tr>
            <td className="w-1/4 border">Date</td>
            <td className="w-1/4 border">Name</td>
            <td className="w-1/4 border">Mail</td>
            <td className="w-1/4 border">Developer</td>
          </tr>
        </thead>
        <tbody>
          {clicks.map((i) => (
            <tr key={i.id} className="border">
              <td className="borde w-1/4">{i.date.toDateString()}</td>
              <td className="borde w-1/4">{i.User.name ?? "N/A"}</td>
              <td className="borde w-1/4">{i.User.email}</td>
              <td className="borde w-1/4">{i.developer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

type Search = RouterOutputs["log"]["getSearch"][number];
type SearchedProps = { searches: Search[] };
const SearchTable = ({ searches }: SearchedProps) => {
  return (
    <section className="flex flex-col">
      <h2>Searches</h2>
      <table className="border-collapse border">
        <thead>
          <tr>
            <td className="w-1/4 border">Date</td>
            <td className="w-1/4 border">Name</td>
            <td className="w-1/4 border">Mail</td>
            <td className="w-1/4 border">Search</td>
          </tr>
        </thead>
        <tbody>
          {searches.map((i) => (
            <tr key={i.id} className="border">
              <td className="w-1/4 border">{i.date.toDateString()}</td>
              <td className="w-1/4 border">{i.User.name ?? "N/A"}</td>
              <td className="w-1/4 border">{i.User.email}</td>
              <td className="w-1/4 border">{i.search}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Admin;
