import Image from "next/image";
import type { RouterOutputs } from "@/trpc/shared";
import ItemContainer from "../ItemContainer";
import LogLink from "./LogLink";

type DeveloperSearch = RouterOutputs["developer"]["getBySearch"][number];
type Props = {
  developer: DeveloperSearch;
};

const SearchItem = ({ developer }: Props) => {
  return (
    <LogLink developerId={developer.id}>
      <ItemContainer>
        <Image
          src={developer.image}
          alt="Image"
          width={48}
          height={48}
          className="rounded-full border-2 border-black"
        />
        <div className="flex grow flex-col">
          <h2 className="text-sm font-bold md:text-2xl">{developer.name}</h2>
          <div className="flex justify-between">
            <ul className="flex gap-1 md:gap-2">
              {developer.skills.slice(0, 4).map((skill, index) => (
                <li
                  className="flex items-center rounded-sm bg-orange px-1 text-[0.6rem] text-white md:rounded-full md:p-1.5"
                  key={skill + index}
                >
                  <p className="whitespace-nowrap">{skill}</p>
                </li>
              ))}
              {developer.skills.length - 4 > 0 && (
                <li className="flex items-center rounded-sm bg-orange px-1 text-[0.6rem] text-white md:rounded-full md:p-1.5">
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
    </LogLink>
  );
};

export default SearchItem;
