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
      <Icon icon="delete" className="h-8 w-8 hover:scale-125" />
    </button>
  );
};

export default RemoveFromCart;
