import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

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
  const searches = await api.log.getSearch.query();
  const className = "border text-xs md:text-base";
  return (
    <main className="flex flex-col gap-2 p-5">
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
            {searches.map(({ id, date, userId, search, User: { email } }) => (
              <tr key={id}>
                <td className={className}>
                  {date.toLocaleTimeString("sv-SE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className={className}>
                  {
                    <Link
                      className="underline"
                      href={`/admin/client/${userId}`}
                    >
                      {email}
                    </Link>
                  }
                </td>
                <td className={className}>{search}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default page;
