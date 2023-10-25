"use client";
import DeveloperForm from "@/app/_components/profile/developer/DeveloperForm";
import { api } from "@/trpc/react";
import type { tDevSchema } from "@/utils/zodSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = { params: { id: string } };
const DeveloperId = ({ params: { id } }: Props) => {
  const router = useRouter();
  const { data: developer, isLoading, refetch } = api.developer.getById.useQuery({ id });
  const { mutateAsync: updateDev } = api.developer.update.useMutation({
    onSuccess: async () => {
      await refetch()
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleData = async (data: tDevSchema) => {
    await updateDev({ dev: data, id });
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DeveloperForm handleData={handleData} developer={developer} />
      )}
    </>
  );
};

export default DeveloperId;
