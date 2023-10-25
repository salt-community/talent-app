"use client";
import DeveloperForm from "@/app/_components/profile/developer/DeveloperForm";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = { params: { id: string } };
const DeveloperId = ({ params: { id } }: Props) => {
  const router = useRouter();
  const {
    data: developer,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = api.developer.getById.useQuery({ id });
  const { mutate: update } = api.developer.update.useMutation({
    onSuccess: async () => {
      await refetch();
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: remove } = api.developer.delete.useMutation({
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>404</p>}
      {isSuccess && (
        <div className="flex flex-col gap-4">
          <DeveloperForm
            handleData={(dev) => update({ dev, id })}
            developer={developer}
          />
          <button
            className="rounded-lg bg-pink p-4 text-center"
            onClick={() => remove(id)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default DeveloperId;
