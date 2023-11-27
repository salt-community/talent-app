import type { RouterOutputs } from "@/trpc/shared";
import Image from "next/image";
import Link from "next/link";
import ItemContainer from "../../_components/ItemContainer";
import Icon from "@/app/assets/icons/Icon";
type NullableDeveloper = RouterOutputs["developer"]["getByUser"];
type Developer = NonNullable<NullableDeveloper>;
type Props = {
  developer: Developer;
};

const Developer = ({ developer: { id, image, name, slug } }: Props) => {
  return (
    <ItemContainer className="gap-4 px-4">
      <Image
        className="h-20 w-20 rounded-full"
        src={image}
        alt="profile picture"
        width={256}
        height={256}
      />
      <p className="grow">{name}</p>

      <Link href={`/developer/${slug}`}>
        <Icon icon="eye" className="h-10" />
      </Link>
      <Link href={`/profile/developer/${id}`}>
        <Icon icon="edit" className="h-10" />
      </Link>
    </ItemContainer>
  );
};

export default Developer;
