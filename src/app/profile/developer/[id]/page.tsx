"use client";
import Button from "@/app/_components/Button";
import DeveloperForm from "@/app/profile/developer/components/DeveloperForm";
import { api } from "@/trpc/react";
import checkIfAuth from "@/utils/redirectIfNotAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = { params: { id: string } };
const DeveloperId = ({ params: { id } }: Props) => {
  const router = useRouter();
  const utils = api.useContext();
  const { data: session } = useSession();
  checkIfAuth(session);
  const {
    data: developer,
    isLoading,
    isSuccess,
    isError,
  } = api.developer.getById.useQuery({ id });
  const { mutate: update, isLoading: updating } =
    api.developer.update.useMutation({
      onSuccess: async () => {
        await utils.developer.invalidate();
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const { mutate: remove, isLoading: deleting } =
    api.developer.delete.useMutation({
      onSuccess: async () => {
        await utils.developer.invalidate();
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const className =
    "flex justify-center w-full h-full items-center font-bold text-black ";
  return (
    <>
      {isLoading && <p className={className}>Loading...</p>}
      {isError && <p className={className}>404 not found</p>}
      {isSuccess && (
        <main className="flex w-full flex-col gap-4 p-2">
          <DeveloperForm
            handleData={(dev) => update({ dev, id })}
            data={{
              ...developer,
              skills: developer.skills.map((i) => ({ skill: i })),
              locationPref: developer.locationPref.map((i) => ({
                location: i,
              })),
            }}
          >
            <div className="flex gap-2">
              <Button
                disabled={updating}
                callToAction
                className="w-1/2 py-2"
                form="developer-form"
              >
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
              className="py-2 hover:bg-pink/60"
              onClick={() => remove(id)}
            >
              Delete
            </Button>
          </DeveloperForm>
        </main>
      )}
    </>
  );
};

export default DeveloperId;
