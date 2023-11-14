import Image from "next/image";
import type { RouterOutputs } from "@/trpc/shared";
import ItemContainer from "../ItemContainer";
import LogLink from "./LogLink";
import Icon from "@/app/assets/icons/Icon";

type DeveloperSearch = RouterOutputs["developer"]["getBySearch"][number];
type Props = {
  developer: DeveloperSearch;
  inCart: boolean;
};

const SearchItem = ({ developer, inCart }: Props) => {
  return (
    <ItemContainer data-cy="developer">
      <LogLink
        className="relative flex items-center w-full h-full p-2 gap-2 gl:gap-6 justify-between lg:px-9"
        developerId={developer.id}
      >
        <Image
          src={developer.image}
          alt="Image"
          width={256}
          height={256}
          className="w-20 rounded-full border-none"
        />
        <div className="flex grow flex-col gap-1">
          <h2 className="text-xl font-normal lg:text-2xl">{developer.name}</h2>
          <ul className="flex flex-wrap gap-1">
            {developer.skills.slice(0, 4).map((skill, index) => (
              <li
                className="lg:text-md flex items-center rounded-full bg-orange/10 px-2 text-xs text-black/70"
                key={skill + index}
              >
                <p className="whitespace-nowrap">{skill}</p>
              </li>
            ))}
            {developer.skills.length - 4 > 0 && (
              <li className="rounded-full bg-orange/10 px-2 text-xs text-black/70">
                +{developer.skills.length - 4}
              </li>
            )}
          </ul>
        </div>
        <p className="text-md hidden overflow-hidden overflow-ellipsis whitespace-nowrap md:flex">
          {developer.title}
        </p>
        {inCart && (
          <Icon
            icon="cart"
            className="absolute right-1 top-1 h-6 fill-orange/40"
          />
        )}
      </LogLink>
    </ItemContainer>
  );
};

export default SearchItem;
