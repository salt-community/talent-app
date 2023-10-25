import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import type { RouterOutputs } from "@/trpc/shared";

type Mob = RouterOutputs["developer"]["getById"]["mobs"][number];

type TeamMembersProps = {
  mob: Mob;
};

const TeamMembers: FC<TeamMembersProps> = ({ mob }) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Team members" />
      <ul className="flex gap-6">
        {mob?.members.map(
          (developer) =>
            developer && (
              <li
                className="gap-2 rounded-md p-2 text-center duration-300 ease-in-out hover:translate-y-[-2%] hover:bg-orange/20"
                key={developer.id}
              >
                <Link
                  className="flex flex-col items-center"
                  href={`/developer/${developer.id}`}
                >
                  <Image
                    src={developer.image}
                    alt="image"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <p>{developer.name}</p>
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default TeamMembers;
