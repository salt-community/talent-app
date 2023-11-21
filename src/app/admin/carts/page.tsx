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
  const cartItems = await api.log.getCarts.query();
  const className = "border text-xs md:text-base";
  return (
    <main>
      <section className="flex flex-col">
        <h2>Carts</h2>
        <table>
          <thead>
            <tr>
              <td className={className}>Date</td>
              <td className={className}>Mail</td>
              <td className={className}>Developer</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(
              ({
                id,
                date,
                User: { email, id: userId },
                developer: { name },
              }) => (
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
                    <Link href={`/admin/client/${userId}`}>{email}</Link>
                  </td>
                  <td className={className}>{name}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default page;
