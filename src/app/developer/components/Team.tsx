import Image from "next/image";
import type { RouterOutputs } from "@/trpc/shared";
import LogLink from "@/app/_components/LogLink";

type Mob = RouterOutputs["developer"]["getBySlug"]["mobs"][number];
type Props = { mob: Mob };

const TeamMembers = ({ mob }: Props) => {
  return (
    <ul className="flex flex-wrap justify-evenly gap-1">
      {mob.members.map((developer) => (
        <li key={developer.id}>
          <LogLink
            className="flex flex-col items-center rounded-md p-2 duration-300 ease-in-out hover:-translate-y-1 hover:bg-orange/20 active:bg-orange"
            slug={developer.slug}
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
  );
};

export default TeamMembers;
