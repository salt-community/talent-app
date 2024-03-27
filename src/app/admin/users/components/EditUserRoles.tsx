"use client";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";
import { zRole, type tRole } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, SelectItem } from "@nextui-org/react";

type Users = RouterOutputs["users"]["getAll"][number];
type Props = { user: Users };

const EditUserRole = ({ user }: Props) => {
  const router = useRouter();
  const { mutate: update } = api.users.changeRole.useMutation({
    onSuccess: () => router.refresh(),
  });

  const ffPublish = process.env.NEXT_PUBLIC_FF_PUBLISH === "ON";

  const publish = (id: string) => {
    console.log(id);
  };

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
    <li className="mb-4 flex w-full flex-col justify-between gap-2 rounded bg-zinc-100 p-3 md:items-baseline">
      <div className="flex w-full grow flex-col items-start justify-between text-xs sm:flex-row md:text-base">
        <div
          className={`flex flex-col  ${
            user.role === "CLIENT" ? "hover:cursor-pointer" : "hover:none"
          }`}
          onClick={() =>
            user.role === "CLIENT" && router.push(`/admin/client/${user.id}`)
          }
        >
          <h6 className="font-bold">{user?.name}</h6>
          <small className="">{user.email}</small>
        </div>
        <form
          className="flex w-full flex-col items-center gap-2 self-end md:w-[150px]"
          onSubmit={(event) =>
            void handleSubmit(({ role }) =>
              update({ id: user.id, zRole: { role } }),
            )(event)
          }
        >
          <Select
            {...register("role")}
            variant="bordered"
            aria-label="role"
            defaultSelectedKeys={[user.role]}
            value={user.role}
            color="primary"
            size="sm"
            labelPlacement="outside"
          >
            <SelectItem key="SALTIE" value="SALTIE">
              SALTIE
            </SelectItem>
            <SelectItem key="CLIENT" value="CLIENT">
              CLIENT
            </SelectItem>
            <SelectItem key="ADMIN" value="ADMIN">
              ADMIN
            </SelectItem>
          </Select>
          <Button
            type="submit"
            disabled={!isDirty}
            color={isDirty ? "primary" : "default"}
            fullWidth
            size="sm"
            radius="sm"
            className="px-5"
          >
            Save
          </Button>
          {ffPublish && (
            <Button
              onClick={() => {
                publish(user.id);
              }}
            >
              Publish
            </Button>
          )}
        </form>
      </div>
    </li>
  );
};

export default EditUserRole;
