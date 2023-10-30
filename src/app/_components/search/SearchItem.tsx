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
    <Link href={`developer/${developer.id}`}>
      <ItemContainer className="justify-between">
        <div className="flex items-center gap-4">
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
        </div>
        <p className="hidden overflow-hidden overflow-ellipsis whitespace-nowrap md:block">
          {developer.title}
        </p>
        <ul className="hidden grow gap-4 lg:flex">
          {developer.skills.slice(0, 4).map((skill, index) => (
            <li
              className="shrink-0 rounded-full bg-orange px-4 py-1 text-sm text-white"
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
    </Link>
  );
};

export default SearchItem;
