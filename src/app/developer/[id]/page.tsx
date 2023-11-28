"use client";
import { api } from "@/trpc/react";
import DevShimmer from "../components/DevShimmer";
import ShowDeveloper from "../components/ShowDeveloper";

const DeveloperPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: developer,
    isSuccess,
    isLoading,
  } = api.developer.getBySlug.useQuery({ id });
  if (isLoading) {
    return <DevShimmer />;
  }
  if (isSuccess) {
    return <ShowDeveloper developer={developer} />;
  }
  return <p>Something went wrong...</p>;
};
export default DeveloperPage;
