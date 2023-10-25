"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../../ItemContainer";
import Image from "next/image";
import toast from "react-hot-toast";
import type { RouterOutputs } from "@/trpc/shared";
import findConnection from "@/app/helpers/findMemberInGroup";
import Link from "next/link";

type Project = RouterOutputs["project"]["getAll"][number];
type Props = { developerId: string };

const JoinProject = ({ developerId }: Props) => {
  const { data, isSuccess, refetch } = api.project.getAll.useQuery();
  const { mutate: join } = api.project.join.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: leave } = api.project.leave.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <>
      {!isSuccess ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {data.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              join={({ groupId }) => join({ developerId, groupId })}
              leave={leave}
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
  leave: ({ id }: { id: string }) => void;
  join: ({ groupId }: { groupId: string }) => void;
  developerId: string;
};
const ProjectItem = ({
  project,
  join,
  leave,
  developerId,
}: ProjectItemProps) => {
  const connectionId = findConnection(project.members, developerId);
  const className = "bg-pink/50 px-2 rounded-md";
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
          <button
            className={className}
            onClick={() =>
              leave({
                id: connectionId,
              })
            }
          >
            Leave
          </button>
        ) : (
          <button
            className={className}
            onClick={() => join({ groupId: project.id })}
          >
            Join
          </button>
        )}
      </div>
    </ItemContainer>
  );
};
export default JoinProject;
