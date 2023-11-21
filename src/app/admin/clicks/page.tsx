"use client";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";

const Admin = () => {
  const { data: session } = useSession();
  if (session && session.user.role !== "ADMIN") {
    <main className="flex grow items-center justify-center">
      <p>You are not allowed here {session.user.role}!</p>
    </main>;
  }
  if (!session) {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here!</p>
      </main>
    );
  }
  const {data: clicks, isSuccess} = api.log.getClicks.useQuery();
  const className = "border text-xs md:text-base";
 
  return (
    <main className="flex flex-col gap-2 p-5">
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
          {isSuccess && clicks.map((i) => (
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
    </main>
  );
};

export default Admin;
