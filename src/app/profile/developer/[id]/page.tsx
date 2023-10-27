"use client";
import Button from "@/app/_components/Button";
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
  const { mutate: remove, isLoading: deleting } =
    api.developer.delete.useMutation({
      onSuccess: async () => {
        await refetch();
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
        <div className="flex max-w-md flex-col gap-4">
          <DeveloperForm
            handleData={(dev) => update({ dev, id })}
            developer={developer}
          >
            <div className="flex gap-2">
              <Button className="w-1/2 py-2" form="developer-form">
                Save
              </Button>
              <Button
                className="w-1/2 py-2"
                onClick={() => router.push("/profile")}
              >
                Go back
              </Button>
            </div>
            <Button
              disabled={deleting}
              className="py-2 hover:bg-pink"
              onClick={() => remove(id)}
            >
              Delete
            </Button>
          </DeveloperForm>
        </div>
      )}
    </>
  );
};

export default DeveloperId;
