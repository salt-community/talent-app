"use client";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";
import { zRole, type tRole } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Users = RouterOutputs["users"]["getAll"][number];
type Props = { user: Users };
const EditUserRole = ({ user }: Props) => {
  const utils = api.useContext();
  const { mutate: update } = api.users.changeRole.useMutation({
    onSuccess: () => utils.users.getAll.invalidate(),
  });
  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<tRole>({
    resolver: zodResolver(zRole),
    defaultValues: { role: user.role },
  });
  return (
    <li className="flex items-center justify-between border px-1 text-xs md:text-base">
      {user.role === "CLIENT" ? (
        <Link className="underline" href={`/admin/client/${user.id}`}>
          {user.email}
        </Link>
      ) : (
        <p>{user.email}</p>
      )}
      <form
        onSubmit={(event) =>
          void handleSubmit(({ role }) =>
            update({ id: user.id, zRole: { role } }),
          )(event)
        }
      >
        {isDirty && <button className="px-5">Save</button>}
        <select {...register("role")}>
          <option>SALTIE</option>
          <option>CLIENT</option>
          <option>ADMIN</option>
        </select>
      </form>
    </li>
  );
};

export default EditUserRole;
