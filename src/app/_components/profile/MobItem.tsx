import Link from "next/link";
import type { RouterOutputs } from "@/trpc/shared";
import ItemContainer from "../ItemContainer";
type Mob = RouterOutputs["mob"]["getByDev"][number];

type Props = {
  mob: Mob;
};

const MobItem = ({ mob: { id, name } }: Props) => {
  return (
    <ItemContainer>
      <Link href={`/profile/mob/${id}`}>
        <p>{name}</p>
      </Link>
    </ItemContainer>
  );
};

export default MobItem;
