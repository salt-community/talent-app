import { api } from "@/trpc/server";
import EditUserRole from "../_components/admin/EditUserRoles";
import { getServerAuthSession } from "@/server/auth";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session || (session && session.user.role !== "ADMIN")) {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here!</p>
      </main>
    );
  }
  const clicks = await api.log.getClicks.query();
  const search = await api.log.getSearch.query();
  const users = await api.users.getAll.query();

  return (
    <main className="flex flex-col gap-2 p-5">
      <h2>Clicked on developers</h2>
      <table className="border-collapse border">
        <thead>
          <tr>
            <td className="border">Date</td>
            <td className="border">Name</td>
            <td className="border">Mail</td>
            <td className="border">Developer</td>
          </tr>
        </thead>
        <tbody>
          {clicks.map((i) => (
            <tr key={i.id} className="border">
              <td className="border">{i.date.toDateString()}</td>
              <td className="border">{i.User.name ?? "N/A"}</td>
              <td className="border">{i.User.email}</td>
              <td className="border">{i.developer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Searches</h2>
      <table className="border-collapse border">
        <thead>
          <tr>
            <td className="border">Date</td>
            <td className="border">Name</td>
            <td className="border">Mail</td>
            <td className="border">Search</td>
          </tr>
        </thead>
        <tbody>
          {search.map((i) => (
            <tr key={i.id} className="border">
              <td className="border">{i.date.toDateString()}</td>
              <td className="border">{i.User.name ?? "N/A"}</td>
              <td className="border">{i.User.email}</td>
              <td className="border">{i.search}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Users</h2>
      <ul className="flex flex-col gap-1">
        {users.map((user) => (
          <EditUserRole key={user.id} user={user} />
        ))}
      </ul>
    </main>
  );
};

export default Admin;
