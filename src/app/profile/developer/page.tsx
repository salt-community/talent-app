"use client";
import { api } from "@/trpc/react";
import DeveloperForm from "../../_components/profile/developer/DeveloperForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import defaultDeveloperData from "@/app/_components/profile/developer/helpers/defaultDeveloperData";
import Button from "@/app/_components/Button";

const DeveloperPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const { mutate: createUser, isLoading: creatingUser } =
    api.developer.create.useMutation({
      onSuccess: () => {
        router.push("/profile");
        router.refresh();
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
    <>
      <div className="relative max-w-md">
        <DeveloperForm developer={newData} handleData={createUser}>
          <Button
            className="py-2"
            disabled={creatingUser}
            form="developer-form"
          >
            Create user
          </Button>
        </DeveloperForm>
      </div>
      <Button className="absolute bottom-2 right-2 py-2">Go back</Button>
    </>
  );
};

export default DeveloperPage;
  