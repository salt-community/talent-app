"use client";
import { api } from "@/trpc/react";
import ItemContainer from "../_components/ItemContainer";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "./components/RemoveFromCart";

const Cart = () => {
  const {
    data: cart,
    isSuccess,
    isLoading,
    isError,
  } = api.cart.getAll.useQuery();

  return (
    <main className="flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink p-2 pt-5">
      <div className="flex w-full flex-col gap-4 rounded-sm lg:w-2/3">
        <h2 className="gap-y-5 p-2 text-center text-2xl font-light lg:text-4xl">
          Your Favorites
        </h2>
        <ul className="flex flex-col gap-2">
          {isSuccess &&
            cart.map(({ developerId, image, name }) => (
              <ItemContainer key={developerId} className="px-4">
                <Link
                  href={`developer/${developerId}`}
                  className="flex w-full justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      alt="developer image"
                      src={image}
                      height={256}
                      width={256}
                      className="w-20 rounded-full"
                    />
                    <p className="text-lg">{name}</p>
                  </div>
                </Link>
                <RemoveFromCart developerId={developerId} />
              </ItemContainer>
            ))}
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong...</p>}
        </ul>
      </div>
    </main>
  );
};

export default Cart;
