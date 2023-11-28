import Link from "next/link";
import ItemContainer from "../../_components/ItemContainer";
import Button from "@/app/_components/Button";
import { api } from "@/trpc/react";
import Icon from "@/app/assets/icons/Icon";

type Props = {
  id: string;
  name: string;
  connectionId: string;
};
const MobItem = ({ id, name, connectionId }: Props) => {
  const utils = api.useContext();
  const { mutate: leave, isLoading: leaving } = api.mob.leave.useMutation({
    onSuccess: () => utils.developer.getByUser.invalidate(),
  });
  return (
    <ItemContainer className="justify-between px-5">
      <p className="grow">{name}</p>
      <Button disabled={leaving} onClick={() => leave({ id: connectionId })}>
        Leave
      </Button>
      <Link href={`/profile/mob/${id}`}>
        <Icon icon="edit" className="h-8 fill-black" />
      </Link>
    </ItemContainer>
  );
};

export default MobItem;
