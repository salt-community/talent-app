"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../../ItemContainer";
import Image from "next/image";
import toast from "react-hot-toast";
import type { RouterOutputs } from "@/trpc/shared";
import findConnection from "@/app/helpers/findMemberInGroup";
import Link from "next/link";
import Button from "../../Button";

type Mob = RouterOutputs["mob"]["getAll"][number];
type Props = { developerId: string };

const JoinMob = ({ developerId }: Props) => {
  const { data: mobs, isSuccess, refetch } = api.mob.getAll.useQuery();

  const update = async () => {
    await refetch();
  };
  return (
    <>
      {!isSuccess ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {mobs.map((mob) => (
            <MobItem
              key={mob.id}
              mob={mob}
              refetch={update}
              developerId={developerId}
            />
          ))}
        </ul>
      )}
    </>
  );
};

type MobItemProps = {
  mob: Mob;
  refetch: () => Promise<void>;
  developerId: string;
};
const MobItem = ({ mob, developerId, refetch }: MobItemProps) => {
  const connectionId = findConnection(mob.members, developerId);
  const { mutate: join, isLoading: joiningMob } = api.mob.join.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: leave, isLoading: leavingMob } = api.mob.leave.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <ItemContainer key={mob.id} className="justify-between">
      <Link href={`/profile/mob/${mob.id}`} className="select-none">
        {mob.name}
      </Link>
      <div className="flex gap-2">
        <div className="flex flex-wrap gap-1">
          {mob.members.map((dev) => (
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
            disabled={leavingMob}
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
            disabled={joiningMob}
            onClick={() => join({ groupId: mob.id, developerId })}
          >
            Join
          </Button>
        )}
      </div>
    </ItemContainer>
  );
};
export default JoinMob;
