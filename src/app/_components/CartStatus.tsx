"use client";
import Icon from "../assets/icons/Icon";
import { api } from "@/trpc/react";
import Link from "next/link";

const CartStatus = () => {
  const { data: cart, isSuccess } = api.cart.getAll.useQuery();

  return (
    <Link href={"/cart"} className="relative">
      <Icon icon="starCart" className="h-8 fill-black lg:h-12" />
      <div className="absolute -right-2 -top-1 flex h-4 w-4 select-none items-center justify-center rounded-full bg-orange/90 lg:h-5 lg:w-5">
        <p className="text-sm text-black">{isSuccess && cart.length}</p>
      </div>
    </Link>
  );
};

export default CartStatus;
