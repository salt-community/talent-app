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
            </ul>
            {developer.skills.length - 4 > 0 && (
              <p className="flex items-center rounded-full bg-orange px-1 text-[0.6rem] text-white md:hidden">
                +{developer.skills.length - 4}
              </p>
            )}
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
