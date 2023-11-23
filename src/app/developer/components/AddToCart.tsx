"use client";
import Icon from "@/app/assets/icons/Icon";
import { api } from "@/trpc/react";

type Props = { developerId: string };

const AddToCart = ({ developerId }: Props) => {
  const utils = api.useContext();
  const {
    data: inCart,
    isSuccess: gotCart,
    refetch,
  } = api.cart.getByDevId.useQuery({ developerId });
  const { mutate: add, isLoading: adding } = api.cart.add.useMutation({
    onSuccess: async () => {
      await refetch();
      await utils.cart.getAll.invalidate();
    },
  });
  const { mutate: remove, isLoading: removing } = api.cart.remove.useMutation({
    onSuccess: async () => {
      await refetch();
      await utils.cart.getAll.invalidate();
      await utils.developer.getBySearch.invalidate();
    },
  });
  return (
    <>
      {gotCart && inCart ? (
        <button disabled={removing} onClick={() => remove({ developerId })}>
          <Icon icon="star" className="h-10 fill-orange" />
        </button>
      ) : (
        <button disabled={adding} onClick={() => add({ developerId })}>
          <Icon icon="starOutline" className="h-10 fill-black/50" />
        </button>
      )}
    </>
  );
};

export default AddToCart;
