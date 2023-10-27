"use client";
import Button from "@/app/_components/Button";
import MobForm from "@/app/_components/profile/mob/MobForm";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Props = { params: { id: string } };

const ProjectPage = ({ params: { id } }: Props) => {
  const router = useRouter();
  const {
    data: mob,
    isSuccess,
    isLoading: gettingMob,
    isError,
  } = api.mob.getById.useQuery({ id });
  const { mutate: updateMob, isLoading: updatingMob } =
    api.mob.update.useMutation({
      onSuccess: () => {
        router.push("/profile");
        router.refresh();
      },
    });
  const { mutate: remove, isLoading: removingMob } = api.mob.remove.useMutation(
    {
      onSuccess: () => {
        router.push("/profile");
        router.refresh();
      },
    },
  );

  return (
    <>
      {gettingMob && <p>Loading...</p>}
      {isSuccess && (
        <div
          className={`flex max-w-md flex-col gap-2 transition-all duration-200 ${
            removingMob && "opacity-0"
          }`}
        >
          <h2 className="text-2xl">Edit project</h2>
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
            className="py-2 hover:bg-pink"
            onClick={() => remove(id)}
          >
            Delete Mob
          </Button>
        </div>
      )}
      {isError && <p>404</p>}
    </>
  );
};

export default ProjectPage;
