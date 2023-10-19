import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { RouterOutputs } from "@/trpc/shared";

type Developer =
  RouterOutputs["developer"]["getById"]["mobs"][number]["Developer"];

type TeamMembersProps = {
  developers: Developer[];
};

const TeamMembers: FC<TeamMembersProps> = ({ developers }) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Team members" />
      <ul className="flex gap-6">
        {developers.map((developer) => (
          <li
            className="gap-2 rounded-md p-2 text-center duration-300 ease-in-out hover:translate-y-[-2%] hover:bg-orange/20"
            key={consultant.id}
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
              <p>
                {developer.firstName} {developer.lastName}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
