import type { RouterOutputs } from "@/trpc/shared";
import Image from "next/image";
import Link from "next/link";
import ItemContainer from "../../_components/ItemContainer";
type NullableDeveloper = RouterOutputs["developer"]["getByUser"];
type Developer = NonNullable<NullableDeveloper>;
type Props = {
  developer: Developer;
};

const Developer = ({ developer: { id, image, name } }: Props) => {
  return (
    <ItemContainer>
      <Link
        className="flex h-full w-full items-center gap-2 px-5"
        href={`/profile/developer/${id}`}
      >
        <Image
          className="h-20 w-20 rounded-full"
          src={image}
          alt="profile picture"
          width={256}
          height={256}
        />
        <p>{name}</p>
      </Link>
    </ItemContainer>
  );
};

export default Developer;
