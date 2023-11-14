import Link from "next/link";
import type { RouterOutputs } from "@/trpc/shared";
import ItemContainer from "../../_components/ItemContainer";
type Mob = RouterOutputs["mob"]["getByDev"][number];

type Props = {
  mob: Mob;
};

const MobItem = ({ mob: { id, name } }: Props) => {
  return (
    <Link href={`/profile/mob/${id}`}>
      <ItemContainer className="px-5">
        <p>{name}</p>
      </ItemContainer>
    </Link>
  );
};

export default MobItem;
