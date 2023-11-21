import { api } from "@/trpc/server";

type UserData = {
  date: Date;
  data: string;
  event: "visit" | "search" | "cart";
};
type Props = { params: { id: string } };

const Client = async ({ params: { id } }: Props) => {
  const res = await api.users.getInteractionsById.query({ id });
  const clicks: UserData[] = res.LogClickDev.map(
    ({ date, developer: { name } }) => ({
      date,
      data: name,
      event: "visit",
    }),
  );
  const searches: UserData[] = res.LogSearch.map(({ date, search }) => ({
    date,
    data: search,
    event: "search",
  }));
  const carts: UserData[] = res.cartItems.map(
    ({ date, developer: { name } }) => ({ date, data: name, event: "cart" }),
  );
  const data = [...clicks, ...searches, ...carts];
  data.sort((a, b) => a.date.toString() - b.date.toString());
  const className = "border text-xs md:text-base";
  return (
    <main>
      <section className="flex flex-col">
        <h2>Clicked on developers</h2>
        <table>
          <thead>
            <tr>
              <td className={className}>Date</td>
              <td className={className}>Data</td>
              <td className={className}>Event</td>
            </tr>
          </thead>
          <tbody>
            {data.map(({ date, data, event }) => (
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
                <td className={className}>{data}</td>
                <td className={className}>{event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Client;
