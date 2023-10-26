"use client";
import { api } from "@/trpc/react";
import DeveloperForm from "../../_components/profile/developer/DeveloperForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import defaultDeveloperData from "@/app/_components/profile/developer/helpers/defaultDeveloperData";

const DeveloperPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const { mutate: createUser } = api.developer.create.useMutation({
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const newData = defaultDeveloperData();
  if (data) {
    newData.name = data.user.name ?? "";
    newData.mail = data.user.email ?? "";
  }
  return (
    <div className="max-w-md">
      <DeveloperForm developer={newData} handleData={createUser} />
    </div>
  );
};

export default DeveloperPage;
