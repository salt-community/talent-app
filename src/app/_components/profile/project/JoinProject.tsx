"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../../ItemContainer";
import Image from "next/image";
import toast from "react-hot-toast";
import type { RouterOutputs } from "@/trpc/shared";
import findConnection from "@/app/helpers/findMemberInGroup";
import Link from "next/link";
import Button from "../../Button";

type Project = RouterOutputs["project"]["getAll"][number];
type Props = { developerId: string };

const JoinProject = ({ developerId }: Props) => {
  const { data: projects, isSuccess, refetch } = api.project.getAll.useQuery();

  const update = async () => {
    await refetch();
  };
  return (
    <>
      {!isSuccess ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              refetch={update}
              developerId={developerId}
            />
          ))}
        </ul>
      )}
    </>
  );
};

type ProjectItemProps = {
  project: Project;
  refetch: () => Promise<void>;
  developerId: string;
};
const ProjectItem = ({ project, developerId, refetch }: ProjectItemProps) => {
  const connectionId = findConnection(project.members, developerId);
  const { mutate: join, isLoading: joiningProject } =
    api.project.join.useMutation({
      onSuccess: async () => {
        await refetch();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const { mutate: leave, isLoading: leavingProject } =
    api.project.leave.useMutation({
      onSuccess: async () => {
        await refetch();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <ItemContainer key={project.id} className="justify-between">
      <Link href={`/profile/project/${project.id}`} className="select-none">
        {project.title}
      </Link>
      <div className="flex gap-2">
        <div className="flex flex-wrap gap-1">
          {project.members.map((dev) => (
            <Image
              className="rounded-full"
              key={dev.connectionId}
              src={dev.image}
              alt="developer profile picture"
              width={48}
              height={48}
            />
          ))}
        </div>
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
    </ItemContainer>
  );
};
export default JoinProject;
