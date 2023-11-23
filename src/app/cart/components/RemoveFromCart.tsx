"use client";
import Icon from "@/app/assets/icons/Icon";
import { api } from "@/trpc/react";

type Props = { developerId: string };

const RemoveFromCart = ({ developerId }: Props) => {
  const utils = api.useContext();
  const { mutate: remove, isLoading: removing } = api.cart.remove.useMutation({
    onSuccess: () => utils.cart.getAll.invalidate(),
  });
  return (
    <button disabled={removing} onClick={() => remove({ developerId })}>
      <Icon icon="star" className="h-10 fill-orange md:hover:scale-110" />
    </button>
  );
};

export default RemoveFromCart;
