import Link from "next/link";
import ItemContainer from "../../_components/ItemContainer";

type Props = {
  id: string;
  name: string;
};

const MobItem = ({ id, name }: Props) => {
  return (
    <Link href={`/profile/mob/${id}`}>
      <ItemContainer className="px-5">
        <p>{name}</p>
      </ItemContainer>
    </Link>
  );
};

export default MobItem;
