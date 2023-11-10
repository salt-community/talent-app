import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import type { RouterOutputs } from "@/trpc/shared";
import Users from "../_components/admin/Users";

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
      <Users users={users} />
    </main>
  );
};

type Clicks = RouterOutputs["log"]["getClicks"][number];
type ClickedProps = { clicks: Clicks[] };
const ClickedTable = ({ clicks }: ClickedProps) => {
  const className = "border text-xs md:text-base";
  return (
    <section className="flex flex-col">
      <h2>Clicked on developers</h2>
      <table>
        <thead>
          <tr>
            <td className={className}>Date</td>
            <td className={className}>Mail</td>
            <td className={className}>Developer</td>
          </tr>
        </thead>
        <tbody>
          {clicks.map((i) => (
            <tr key={i.id}>
              <td className={className}>
                {i.date.toLocaleTimeString("sv-SE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td className={className}>{i.User.email}</td>
              <td className={className}>{i.developer.name}</td>
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
  const className = "border text-xs md:text-base";
  return (
    <section className="flex flex-col">
      <h2>Searches</h2>
      <table>
        <thead>
          <tr>
            <td className={className}>Date</td>
            <td className={className}>Mail</td>
            <td className={className}>Search</td>
          </tr>
        </thead>
        <tbody>
          {searches.map((i) => (
            <tr key={i.id}>
              <td className={className}>
                {i.date.toLocaleTimeString("sv-SE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td className={className}>{i.User.email}</td>
              <td className={className}>{i.search}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Admin;
