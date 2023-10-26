"use client";
import uiToFullYT from "@/app/_components/helpers/uiToFullYT";
import ProjectForm from "@/app/_components/profile/project/ProjectForm";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = { params: { id: string } };

const ProjectPage = ({ params: { id } }: Props) => {
  const router = useRouter();
  const {
    data: project,
    isSuccess,
    isLoading,
    isError,
  } = api.project.getById.useQuery({ id });
  const { mutate: updateProject } = api.project.update.useMutation({
    onSuccess: () => {
      router.push("/profile");
    },
  });
  const { mutate: remove } = api.project.remove.useMutation({
    onSuccess: () => {
      router.push("/profile");
    },
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <div className="flex flex-col gap-2 max-w-md">
          <h2 className="text-2xl">Edit project</h2>
          <ProjectForm
            handleData={(project) => updateProject({ id, project })}
            project={{ ...project, youtube: uiToFullYT(project.youtube) }}
          />
          <button
            className="rounded-lg bg-pink p-4 text-center"
            onClick={() => remove(id)}
          >
            Delete
          </button>
          <button
            onClick={() => {
              router.push("/profile");
            }}
          >
            Close
          </button>
        </div>
      )}
      {isError && <p>404</p>}
    </>
  );
};

export default ProjectPage;
