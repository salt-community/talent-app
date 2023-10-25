"use client";
import { api } from "@/trpc/react";
import DeveloperForm from "../../_components/profile/developer/DeveloperForm";
import type { RouterInputs } from "@/trpc/shared";
import { useRouter } from "next/navigation";
type Developer = RouterInputs["developer"]["create"];

const DeveloperPage = () => {
  const router = useRouter();
  const { mutateAsync } = api.developer.create.useMutation({
    onSuccess: (data) => {
      router.push(`/profile/developer/${data.id}`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const createUser = async (data: Developer) => {
    await mutateAsync(data);
  };
  return (
    <div>
      <DeveloperForm handleData={createUser} />
    </div>
  );
};

export default DeveloperPage;
