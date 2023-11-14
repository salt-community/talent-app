"use client";
import Icon from "../assets/icons/Icon";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CartStatus = () => {
  const { data: session } = useSession();
  const {
    data: cart,
    isSuccess,
    isLoading,
    isError,
  } = api.cart.getAll.useQuery();

  return (
    <>
      {session && session.user.role === "CLIENT" && (
        <Link href={"/cart"} className="relative">
          <Icon icon="cart" className="h-10 lg:h-12 fill-orange" />
          <div className="absolute top-0 right-0 flex h-4 w-4 lg:h-5 lg:w-5 select-none items-center justify-center rounded-full bg-black/90">
            <p className="text-white text-sm">{isSuccess && cart.length}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default CartStatus;
