import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import type { RouterOutputs } from "@/trpc/shared";
import ItemContainer from "./ItemContainer";

type DeveloperSearch = RouterOutputs["developer"]["getBySearch"][number];
type DeveloperListProps = {
  consultant: DeveloperSearch;
};

const SearchItem: FC<DeveloperListProps> = ({ consultant }) => {
  return (
    <ItemContainer className="justify-between">
      <Link
        href={`developer/${consultant.id}`}
        className="flex items-center gap-4"
      >
        <Image
          src={consultant.image}
          alt="Image"
          width={48}
          height={48}
          className="rounded-full border-2 border-black"
        />
        <h2 className="text-sm font-bold md:text-2xl">{consultant.name}</h2>
        <p className="hidden md:block">{consultant.title}</p>
      </Link>
      <ul className="hidden gap-4 lg:flex">
        {consultant.skills.slice(0, 4).map((skill, index) => (
          <li key={skill + index}>
            <p className="rounded-full bg-orange px-4 py-1 text-sm text-white">
              {skill}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex items-center ">
        <Github
          url={consultant.gitHubUrl}
          className={"h-10 w-10 md:h-16 md:w-16"}
        />
        <LinkedIn
          url={consultant.linkedinUrl}
          className={"h-10 w-10 md:h-16 md:w-16"}
        />
      </div>
    </ItemContainer>
  );
};

export default SearchItem;
