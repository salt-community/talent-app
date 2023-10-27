import Image from "next/image";
import Link from "next/link";
import Github from "../../assets/icons/Github";
import LinkedIn from "../../assets/icons/LinkedIn";
import type { RouterOutputs } from "@/trpc/shared";
import ItemContainer from "../ItemContainer";

type DeveloperSearch = RouterOutputs["developer"]["getBySearch"][number];
type Props = {
  developer: DeveloperSearch;
};

const SearchItem = ({ developer }: Props) => {
  return (
    <ItemContainer className="justify-between">
      <Link
        href={`developer/${developer.id}`}
        className="flex items-center gap-4"
      >
        <Image
          src={developer.image}
          alt="Image"
          width={48}
          height={48}
          className="rounded-full border-2 border-black"
        />
        <h2 className="shrink-0 grow text-sm font-bold md:text-2xl">
          {developer.name}
        </h2>
        <p className="hidden whitespace-nowrap overflow-hidden overflow-ellipsis md:block">
          {developer.title}
        </p>
      </Link>
      <ul className="hidden grow gap-4 lg:flex">
        {developer.skills.slice(0, 4).map((skill, index) => (
          <li
            className="rounded-full bg-orange px-4 py-1 text-sm text-white shrink-0"
            key={skill + index}
          >
            <p>{skill}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <Github
          url={developer.gitHubUrl}
          className={"h-10 w-10 md:h-16 md:w-16"}
        />
        <LinkedIn
          url={developer.linkedinUrl}
          className={"h-10 w-10 md:h-16 md:w-16"}
        />
      </div>
    </ItemContainer>
  );
};

export default SearchItem;
