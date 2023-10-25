"use client";
import { api } from "@/trpc/react";
import DeveloperForm from "../../_components/profile/developer/DeveloperForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeveloperPage = () => {
  const router = useRouter();
  const { mutate: createUser } = api.developer.create.useMutation({
    onSuccess: (data) => {
      router.push(`/profile/developer/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      <DeveloperForm handleData={createUser} />
    </div>
  );
};

export default DeveloperPage;
