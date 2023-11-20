"use client";
import Button from "@/app/_components/Button";
import MobForm from "@/app/profile/mob/components/MobForm";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Props = { params: { id: string } };

const ProjectPage = ({ params: { id } }: Props) => {
  const router = useRouter();
  const utils = api.useContext();
  const {
    data: mob,
    isSuccess,
    isLoading: gettingMob,
    isError,
  } = api.mob.getById.useQuery({ id });
  const { mutate: updateMob, isLoading: updatingMob } =
    api.mob.update.useMutation({
      onSuccess: async () => {
        await utils.developer.getByUser.invalidate();
        router.push("/profile");
      },
    });
  const { mutate: remove, isLoading: removingMob } = api.mob.remove.useMutation(
    {
      onSuccess: async () => {
        await utils.developer.getByUser.invalidate();
        router.push("/profile");
      },
    },
  );
  const className =
    "flex justify-center w-full h-full items-center font-bold text-black ";
  return (
    <>
      {gettingMob && <p className={className}>Loading...</p>}
      {isSuccess && (
        <main className="flex max-w-md flex-col gap-2 p-2">
          <h2 className="text-2xl">Edit mob</h2>
          <MobForm handleData={(mob) => updateMob({ id, mob })} mob={mob}>
            <div className="flex gap-2">
              <Button
                className="w-1/2 py-2"
                disabled={updatingMob}
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="w-1/2 py-2"
                type="button"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Go back
              </Button>
            </div>
          </MobForm>
          <Button
            disabled={removingMob}
            className="py-2 hover:bg-pink/60"
            onClick={() => remove(id)}
          >
            Delete Mob
          </Button>
        </main>
      )}
      {isError && <p>404</p>}
    </>
  );
};

export default ProjectPage;
