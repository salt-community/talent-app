"use client";
import { api } from "@/trpc/react";
import Button from "../Button";

type Props = { developerId: string };

const AddToCart = ({ developerId }: Props) => {
  const utils = api.useContext();
  const {
    data: cart,
    isSuccess: haveCart,
    isLoading: noCart,
  } = api.cart.getAll.useQuery();
  const { mutate: add, isLoading: adding } = api.cart.add.useMutation({
    onSuccess: async () => {
      await utils.cart.invalidate();
    },
  });
  const { mutate: remove, isLoading: removing } = api.cart.remove.useMutation({
    onSuccess: async () => {
      await utils.cart.invalidate();
    },
  });
  return (
    <>
      {noCart && <p>Loading...</p>}
      {haveCart && cart.some((i) => i.developerId === developerId) ? (
        <Button disabled={removing} onClick={() => remove({ developerId })}>
          Remove from cart
        </Button>
      ) : (
        <Button disabled={adding} onClick={() => add({ developerId })}>
          Add to cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
