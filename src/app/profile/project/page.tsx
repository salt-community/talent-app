"use client";
import JoinProject from "@/app/_components/profile/project/JoinProject";
import ProjectForm from "@/app/_components/profile/project/ProjectForm";
import { api } from "@/trpc/react";
import { projectParams } from "@/utils/zodSchema";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProjectPage = () => {
  const router = useRouter();
  const { mutate: join } = api.project.join.useMutation({
    onSuccess: () => {
      console.log("success");
      router.push("/profile");
    },
  });
  const { mutate: create } = api.project.create.useMutation({
    onSuccess: ({ id }) => {
      join({
        developerId,
        groupId: id,
      });
    },
  });
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const validatedSearchParams = projectParams.safeParse(searchParamsObject);
  if (!validatedSearchParams.success) {
    toast.error("Incorrect url");
    router.push("/profile");
    return;
  }
  const { id: developerId } = validatedSearchParams.data;
  if (validatedSearchParams.data.do === "create") {
    return <ProjectForm handleData={create} />;
  }
  if (validatedSearchParams.data.do === "join") {
    return <JoinProject developerId={developerId} />;
  }
};

export default ProjectPage;
