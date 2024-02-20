"use client";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";
import { zRole, type tRole } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Users = RouterOutputs["users"]["getAll"][number];
type Props = { user: Users };
const EditUserRole = ({ user }: Props) => {
  const {
    data: fetchedDeveloper,
    isLoading,
    isSuccess,
    isError,
  } = api.developer.getById.useQuery({ id: user.id });
  // fetch devloper and add to state
  const [isPublished, setIsPublished] = useState(
    Boolean(fetchedDeveloper?.published),
  );

  const handlePublished = () => {
    // fetch developer
    // find the value of developer.published
    // update the value of developer.published
    update({ id: user.id, zRole: { role } });
  };

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
        {user.developerId && (
          <div>
            <label htmlFor="publishDev">
              Publish
              <input
                id="publishDev"
                type="checkbox"
                checked={developer.published}
                onChange={() => handlePublished()}
              />
            </label>
          </div>
        )}
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
