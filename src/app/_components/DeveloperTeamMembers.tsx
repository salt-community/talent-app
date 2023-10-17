import type { Consultant } from "@/types";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

type TeamMembersProps = {
  consultants: Consultant[];
};

const TeamMembers: FC<TeamMembersProps> = ({ consultants }) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Team members"/>
      <ul className="flex gap-6">
        {consultants.map((consultant) => (
          <li className="p-2 rounded-md hover:translate-y-[-2%] hover:bg-orange/20 ease-in-out duration-300 text-center gap-2" key={consultant.id}>
            <Link
              className="flex flex-col items-center"
              href={`/developer/${consultant.id}`}
            >
              <Image
                src={consultant.image}
                alt="image"
                width={50}
                height={50}
                className="rounded-full"
              />
              <p>
                {consultant.firstName} {consultant.lastName}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
