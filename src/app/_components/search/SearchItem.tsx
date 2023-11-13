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
          width={256}
          height={256}
          className="w-20 rounded-full border-none"
        />
        <div className="flex grow flex-col">
          <h2 className="text-xl font-normal lg:text-2xl">{developer.name}</h2>
            <ul className="flex flex-wrap gap-1">
              {developer.skills.slice(0, 4).map((skill, index) => (
                <li
                  className="lg:text-md flex items-center text-xs text-black/70 px-2 bg-orange/10 rounded-full"
                  key={skill + index}
                >
                  <p className="whitespace-nowrap">{skill}</p>
                </li>
              ))}
              {developer.skills.length - 4 > 0 && (
                <li className="text-[0.6rem] text-sm text-black/70 px-2 bg-orange/10 rounded-full">
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
