import Image from "next/image";
import SectionHeader from "./SectionHeader";
import type { RouterOutputs } from "@/trpc/shared";
import LogLink from "@/app/_components/search/LogLink";

type Mob = RouterOutputs["developer"]["getById"]["mobs"][number];

type Props = {
  mobs: Mob[];
};

const TeamMembers = ({ mobs }: Props) => {
  return (
    <>
      {mobs.map((mob) => (
        <section className="flex w-full flex-col gap-4" key={mob.id}>
          <SectionHeader title="Team members" />
          <ul className="flex flex-wrap justify-evenly gap-1">
            {mob.members.map((developer) => (
              <li key={developer.id}>
                <LogLink
                  className="flex flex-col items-center rounded-md px-2 duration-300 ease-in-out hover:translate-y-[-2%] hover:bg-orange/20 active:bg-orange"
                  developerId={developer.id}
                >
                  <Image
                    src={developer.image}
                    alt="image"
                    width={256}
                    height={256}
                    className="h-12 w-12 rounded-full"
                  />
                  <p className="whitespace-nowrap text-center text-sm">
                    {developer.name}
                  </p>
                </LogLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

export default TeamMembers;
