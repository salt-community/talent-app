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
          className="w-20 rounded-full border-none mr-1"
        />
        <div className="flex grow flex-col">
          <h2 className="text-xl font-normal lg:text-2xl">{developer.name}</h2>
            <ul className="flex flex-wrap gap-1">
              {developer.skills.slice(0, 4).map((skill, index) => (
                <li
                  className="lg:text-md flex items-center text-sm text-black/50 md:rounded-full"
                  key={skill + index}
                >
                  <p className="whitespace-nowrap">{skill}</p>
                </li>
              ))}
              {developer.skills.length - 4 > 0 && (
                <li className="flex items-center rounded-sm text-[0.6rem] text-sm text-black/40">
                  +{developer.skills.length - 4}
                </li>
              )}
            </ul>
        </div>
        <p className="hidden overflow-hidden overflow-ellipsis whitespace-nowrap text-md md:flex">
          {developer.title}
        </p>
      </ItemContainer>
    </LogLink>
  );
};

export default SearchItem;
