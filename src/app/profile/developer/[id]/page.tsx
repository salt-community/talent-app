"use client";
import DeveloperForm from "@/app/_components/profile/developer/DeveloperForm";
import { api } from "@/trpc/react";
import type { RouterInputs } from "@/trpc/shared";
type Developer = RouterInputs["developer"]["create"];

type Props = { params: { id: string } };
const DeveloperId = ({ params: { id } }: Props) => {
  const { data: developer, isLoading } = api.developer.getById.useQuery({ id });
  const handleData = async (data: Developer) => {
    console.log(data);
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DeveloperForm handleData={handleData} developer={developer} />
      )}
    </div>
  );
};

export default DeveloperId;
