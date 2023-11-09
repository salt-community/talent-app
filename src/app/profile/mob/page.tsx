"use client";
import Button from "@/app/_components/Button";
import JoinMob from "@/app/_components/profile/mob/JoinMob";
import MobForm from "@/app/_components/profile/mob/MobForm";
import { api } from "@/trpc/react";
import { projectParams } from "@/utils/zodSchema";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const MobPage = () => {
  const router = useRouter();
  const utils = api.useContext();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const validatedSearchParams = projectParams.safeParse(searchParamsObject);
  if (!validatedSearchParams.success) {
    toast.error("Incorrect url");
    router.push("/profile");
    return;
  }
  const { id: developerId } = validatedSearchParams.data;
  const { mutate: create, isLoading: creatingMob } = api.mob.create.useMutation(
    {
      onSuccess: async () => {
        await utils.mob.invalidate();
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );
  if (validatedSearchParams.data.do === "create") {
    return (
      <main className="flex max-w-md flex-col gap-2 p-2">
        <h2 className="text-2xl">Create mob</h2>
        <MobForm handleData={(mob) => create({ mob, developerId })}>
          <div className="flex gap-2">
            <Button disabled={creatingMob} className="w-1/2 py-2">
              Create mob
            </Button>
            <Button
              className="w-1/2 py-2"
              onClick={() => router.push("/profile")}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </MobForm>
      </main>
    );
  }
  if (validatedSearchParams.data.do === "join") {
    return <JoinMob developerId={developerId} />;
  }
};

export default MobPage;
