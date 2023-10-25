"use client";
import ProjectForm from "@/app/_components/profile/project/ProjectForm";
import { api } from "@/trpc/react";
import React from "react";

type Props = { params: { id: string } };

const ProjectPage = ({ params: { id } }: Props) => {
  const {
    data: project,
    isSuccess,
    isLoading,
    isError,
  } = api.project.getById.useQuery({ id });
  const { mutateAsync: updateProject } = api.project.update.useMutation();

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
        </>
      )}
      {isError && <p>404</p>}
    </div>
  );
};

export default ProjectPage;
