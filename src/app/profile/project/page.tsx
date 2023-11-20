"use client";
import Button from "@/app/_components/Button";
import JoinProject from "@/app/profile/project/components/JoinProject";
import ProjectForm from "@/app/profile/project/components/ProjectForm";
import { api } from "@/trpc/react";
import { projectParams } from "@/utils/zodSchema";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProjectPage = () => {
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
  const { mutate: create, isLoading: creatingProject } =
    api.project.create.useMutation({
      onSuccess: async () => {
        await utils.developer.getByUser.invalidate();
        router.push("/profile");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  if (validatedSearchParams.data.do === "create") {
    return (
      <main className="flex max-w-md flex-col gap-2 p-2">
        <h2 className="text-2xl">Create project</h2>
        <ProjectForm handleData={(project) => create({ project, developerId })}>
          <div className="flex gap-2">
            <Button disabled={creatingProject} className="w-1/2 py-2">
              Create project
            </Button>
            <Button
              className="w-1/2 py-2"
              onClick={() => router.push("/profile")}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </ProjectForm>
      </main>
    );
  }
  if (validatedSearchParams.data.do === "join") {
    return <JoinProject developerId={developerId} />;
  }
};

export default ProjectPage;
