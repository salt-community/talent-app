"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../../../_components/ItemContainer";
import Image from "next/image";
import toast from "react-hot-toast";
import type { RouterOutputs } from "@/trpc/shared";
import findConnection from "@/app/helpers/findMemberInGroup";
import Link from "next/link";
import Button from "../../../_components/Button";

type Mob = RouterOutputs["mob"]["getAll"][number];
type Props = { developerId: string };

const JoinMob = ({ developerId }: Props) => {
  const { data: mobs, isSuccess } = api.mob.getAll.useQuery();
  return (
    <main className="flex grow flex-col bg-orange p-4">
      {!isSuccess ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {mobs.map((mob) => (
            <MobItem key={mob.id} mob={mob} developerId={developerId} />
          ))}
        </ul>
      )}
    </main>
  );
};

type MobItemProps = {
  mob: Mob;
  developerId: string;
};
const MobItem = ({ mob, developerId }: MobItemProps) => {
  const utils = api.useContext();
  const connectionId = findConnection(mob.members, developerId);
  const { mutate: join, isLoading: joiningMob } = api.mob.join.useMutation({
    onSuccess: async () => {
      await utils.mob.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: leave, isLoading: leavingMob } = api.mob.leave.useMutation({
    onSuccess: async () => {
      await utils.mob.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <ItemContainer key={mob.id} className="flex-col justify-normal p-2">
      <div className="flex w-full justify-between">
        <Link href={`/profile/mob/${mob.id}`} className="select-none">
          {mob.name}
        </Link>
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
      <ul className="flex w-full gap-1">
        {mob.members.map((dev) => (
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
export default JoinMob;
