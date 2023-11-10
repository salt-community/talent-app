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
      <ItemContainer>
        <Image
          src={developer.image}
          alt="Image"
          width={48}
          height={48}
          className="rounded-full border-2 border-black"
        />
        <div className="flex grow flex-col">
          <h2 className="text-xl font-normal lg:text-2xl">{developer.name}</h2>
          <div className="flex justify-between">
            <ul className="flex flex-wrap md:gap-2">
              {developer.skills.slice(0, 4).map((skill, index) => (
                <li
                  className="lg:text-md flex items-center px-1 text-sm text-black/40 md:rounded-full md:p-1.5"
                  key={skill + index}
                >
                  <p className="whitespace-nowrap">{skill}</p>
                </li>
              ))}
              {developer.skills.length - 4 > 0 && (
                <li className="flex items-center rounded-sm px-1 text-[0.6rem] text-sm text-black/40 md:p-1.5">
                  +{developer.skills.length - 4}
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="hidden overflow-hidden overflow-ellipsis whitespace-nowrap text-xs md:flex">
          {developer.title}
        </p>
      </ItemContainer>
    </Link>
  );
};

export default SearchItem;
