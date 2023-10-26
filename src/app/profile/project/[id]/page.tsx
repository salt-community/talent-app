"use client";
import Button from "@/app/_components/Button";
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
    isLoading: gettingProject,
    isError,
  } = api.project.getById.useQuery({ id });
  const { mutate: updateProject, isLoading: updatingProject } =
    api.project.update.useMutation({
      onSuccess: () => {
        router.push("/profile");
      },
    });
  const { mutate: remove, isLoading: removingProject } =
    api.project.remove.useMutation({
      onSuccess: () => {
        router.push("/profile");
      },
    });

  return (
    <>
      {gettingProject && <p>Loading...</p>}
      {isSuccess && (
        <div
          className={`flex max-w-md flex-col gap-2 transition-all duration-200 ${
            removingProject && "opacity-0"
          }`}
        >
          <h2 className="text-2xl">Edit project</h2>
          <ProjectForm
            handleData={(project) => updateProject({ id, project })}
            project={{ ...project, youtube: uiToFullYT(project.youtube) }}
          >
            <div className="flex gap-2">
              <Button
                className="w-1/2 py-2"
                disabled={updatingProject}
                type="submit"
              >
                Submit
              </Button>{" "}
              <Button
                className="w-1/2 py-2"
                type="button"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Go back
              </Button>
            </div>
          </ProjectForm>
          <Button
            disabled={removingProject}
            className="py-2 hover:bg-pink"
            onClick={() => remove(id)}
          >
            Delete project
          </Button>
        </div>
      )}
      {isError && <p>404</p>}
    </>
  );
};

export default ProjectPage;
