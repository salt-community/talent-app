"use client";
import type { RouterOutputs } from "@/trpc/shared";
import EditUserRole from "./EditUserRoles";
import { useState } from "react";

type User = RouterOutputs["users"]["getAll"][number];
type Props = { users: User[] };

const Users = ({ users }: Props) => {
  const [filter, setFilter] = useState({ search: "", role: "" });

  return (
    <section>
      <form className="flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="search">Search mail</label>
          <input
            className="border"
            type="text"
            id="search"
            value={filter.search}
            placeholder="Search email"
            onChange={({ target: { value } }) =>
              setFilter(({ role }) => ({ role, search: value }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Filter role</label>
          <select
            id="role"
            value={filter.role}
            onChange={({ target: { value } }) =>
              setFilter(({ search }) => ({ role: value, search }))
            }
          >
            <option value="">Select</option>
            <option value="SALTIE">Saltie</option>
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </form>
      <h2>Users</h2>
      <ul className="flex flex-col gap-1">
        {users
          .filter(({ role }) =>
            filter.role ? role.toString() === filter.role : true,
          )
          .filter(({ email }) => {
            if (email && filter.search) {
              return email.includes(filter.search.toLowerCase());
            }
            return true;
          })
          .map((user) => (
            <EditUserRole key={user.id} user={user} />
          ))}
      </ul>
    </section>
  );
};

export default Users;
