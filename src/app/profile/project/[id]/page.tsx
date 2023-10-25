"use client";
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
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <h2 className="text-2xl">Edit project</h2>
          <ProjectForm
            handleData={(project) => updateProject({ id, project })}
            project={project}
          />
          <button
            className="rounded-lg bg-pink p-4 text-center"
            onClick={() => remove(id)}
          >
            Delete
          </button>
        </>
      )}
      {isError && <p>404</p>}
    </div>
  );
};

export default ProjectPage;
