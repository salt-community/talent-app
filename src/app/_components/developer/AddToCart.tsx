"use client";
import { api } from "@/trpc/react";
import Button from "../Button";

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
    },
  });
  return (
    <>
      {gotCart && inCart ? (
        <Button disabled={removing} onClick={() => remove({ developerId })}>
          Remove from cart
        </Button>
      ) : (
        <Button callToAction disabled={adding} onClick={() => add({ developerId })}>
          Add to cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
