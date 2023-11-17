"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../../../_components/ItemContainer";
import Image from "next/image";
import toast from "react-hot-toast";
import type { RouterOutputs } from "@/trpc/shared";
import findConnection from "@/app/helpers/findMemberInGroup";
import Link from "next/link";
import Button from "../../../_components/Button";

type Project = RouterOutputs["project"]["getAll"][number];
type Props = { developerId: string };

const JoinProject = ({ developerId }: Props) => {
  const { data: projects, isSuccess } = api.project.getAll.useQuery();
  return (
    <main className="flex flex-col bg-orange p-4 grow">
      {!isSuccess ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              developerId={developerId}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

type ProjectItemProps = {
  project: Project;
  developerId: string;
};
const ProjectItem = ({ project, developerId }: ProjectItemProps) => {
  const utils = api.useContext();
  const connectionId = findConnection(project.members, developerId);
  const { mutate: join, isLoading: joiningProject } =
    api.project.join.useMutation({
      onSuccess: async () => {
        await utils.project.getAll.invalidate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const { mutate: leave, isLoading: leavingProject } =
    api.project.leave.useMutation({
      onSuccess: async () => {
        await utils.project.getAll.invalidate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <ItemContainer key={project.id} className="flex-col justify-normal p-2">
      <div className="flex w-full justify-between">
        <Link href={`/profile/project/${project.id}`} className="select-none">
          {project.title}
        </Link>
        {connectionId ? (
          <Button
            disabled={leavingProject}
            onClick={() =>
              leave({
                id: connectionId,
              })
            }
          >
            Leave
          </Button>
        ) : (
          <Button
            disabled={joiningProject}
            onClick={() => join({ groupId: project.id, developerId })}
          >
            Join
          </Button>
        )}
      </div>
      <ul className="flex w-full gap-1">
        {project.members.map((dev) => (
          <li key={dev.connectionId}>
            <Image
              className="h-12 w-12 rounded-full"
              src={dev.image}
              alt="developer profile picture"
              width={256}
              height={256}
            />
          </li>
        ))}
      </ul>
    </ItemContainer>
  );
};
export default JoinProject;
