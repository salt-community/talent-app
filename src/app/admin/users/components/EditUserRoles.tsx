"use client";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";
import { zRole, type tRole } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Users = RouterOutputs["users"]["getAll"][number];
type Props = { user: Users };
const EditUserRole = ({ user }: Props) => {
  const router = useRouter();
  const { mutate: update } = api.users.changeRole.useMutation({
    onSuccess: () => router.refresh(),
  });
  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitSuccessful },
    reset,
  } = useForm<tRole>({
    resolver: zodResolver(zRole),
    defaultValues: { role: user.role },
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({}, { keepValues: true });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <li className="flex justify-between border p-2 text-xs md:text-base">
      {user.role === "CLIENT" ? (
        <Link className="underline" href={`/admin/client/${user.id}`}>
          {user.email}
        </Link>
      ) : (
        <p className="font-bold">{user.email}</p>
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
