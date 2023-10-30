import Image from "next/image";
import Link from "next/link";
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
        <div className="flex items-center gap-2">
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
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">
            {developer.title}
          </p>
        </div>
        <ul className="hidden gap-4 lg:flex">
          {developer.skills.slice(0, 4).map((skill, index) => (
            <li
              className="shrink-0 rounded-full bg-orange px-4 py-1 text-sm text-white"
              key={skill + index}
            >
              <p>{skill}</p>
            </li>
          ))}
        </ul>
      </ItemContainer>
    </Link>
  );
};

export default SearchItem;
