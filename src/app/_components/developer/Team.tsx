import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import type { RouterOutputs } from "@/trpc/shared";

type Mob = RouterOutputs["developer"]["getById"]["mobs"][number];

type Props = {
  mobs: Mob[];
};

const TeamMembers = ({ mobs }: Props) => {
  return (
    <>
      {!!mobs &&
        mobs.map((mob) => (
          <section className="flex w-full flex-col gap-4" key={mob.id}>
            <SectionHeader title="Team members" />
            <ul className="flex flex-wrap justify-evenly gap-1">
              {mob.members.map((developer) => (
                <li key={developer.id}>
                  <Link
                    className="flex flex-col items-center rounded-md px-2 duration-300 ease-in-out hover:translate-y-[-2%] hover:bg-orange/20 active:bg-orange"
                    href={`/developer/${developer.id}`}
                  >
                    <Image
                      src={developer.image}
                      alt="image"
                      width={50}
                      height={50}
                      className="h-12 w-12 rounded-full"
                    />
                    <p className="text-center text-sm whitespace-nowrap">{developer.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </>
  );
};

export default TeamMembers;
