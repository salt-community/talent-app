"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../_components/ItemContainer";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import Icon from "../assets/icons/Icon";
import type { RouterOutputs } from "@/trpc/shared";
import Button from "../_components/Button";
type Developer = RouterOutputs["cart"]["getAll"][number];

const Cart = () => {
  const {
    data: cart,
    isSuccess,
    isLoading,
    isError,
  } = api.cart.getAll.useQuery();

  return (
    <main className="flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink pt-5">
      <h2 className="gap-y-5 p-2 text-center text-2xl font-light lg:text-4xl">
        Your Favorites
      </h2>
      <ul className="flex w-full flex-col gap-2 p-2 lg:w-2/3">
        {isSuccess &&
          cart.map((dev) => <CartItem key={dev.developerId} developer={dev} />)}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong...</p>}
      </ul>
    </main>
  );
};

type CartItemProps = { developer: Developer };
const CartItem = ({
  developer: { developerId, comment, slug, image, name },
}: CartItemProps) => {
  const { register, handleSubmit } = useForm<{ comment: string }>({
    defaultValues: { comment: comment ? comment : "" },
  });
  const utils = api.useContext();
  const { mutate: updateComment } = api.cart.updateComment.useMutation({
    onSuccess: async () => {
      setEdit(false);
      await utils.cart.getAll.invalidate();
    },
  });
  const { mutate: remove, isLoading: removing } = api.cart.remove.useMutation({
    onSuccess: () => utils.cart.getAll.invalidate(),
  });
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <ItemContainer className="relative gap-4 p-4">
        {visible && (
          <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center gap-2 bg-black/90 p-6">
            <p className="text-white">Remove from favorites?</p>
            <div className="flex h-full w-full justify-between gap-6">
              <Button
                disabled={removing}
                onClick={() => remove({ developerId })}
                className="grow"
              >
                Yes
              </Button>
              <Button onClick={() => setVisible(false)} className="grow">
                No
              </Button>
            </div>
          </div>
        )}
        <Image
          alt="developer image"
          src={image}
          height={256}
          width={256}
          className="w-20 rounded-full"
        />
        <div className="flex h-full w-full flex-col">
          <Link href={`developer/${slug}`} className="w-fit text-lg underline">
            {name}
          </Link>
          <div className="flex h-full items-center justify-between">
            {!edit && (
              <>
                <p className="self-start text-sm">
                  {comment ? comment : "Click pen to add a comment"}
                </p>
                <button className="self-end" onClick={() => setEdit(true)}>
                  <Icon icon="edit" className="h-6 fill-black" />
                </button>
              </>
            )}
          </div>
        </div>
        <button
          className="absolute right-1 top-1"
          onClick={() => setVisible(true)}
        >
          <Icon icon="star" className="w-10 fill-orange" />
        </button>
      </ItemContainer>
      {edit && (
        <form
          onSubmit={(e) =>
            void handleSubmit(({ comment }) =>
              updateComment({ developerId, comment }),
            )(e)
          }
          className="relative flex w-full rounded-md bg-white p-2 pr-14"
        >
          <textarea
            placeholder="Add a comment if you like."
            className="h-44 w-full bg-gray outline-none"
            {...register("comment")}
          />
          <button type="button" onClick={() => setEdit(false)}>
            <Icon
              icon="close"
              className="absolute right-1 top-2 h-10 fill-black"
            />
          </button>
          <button>
            <Icon
              icon="check"
              className="absolute bottom-2 right-1 h-10 fill-black"
            />
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default Cart;
