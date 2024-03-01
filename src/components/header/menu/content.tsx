"use client";

import { useSession } from "next-auth/react";
import { SignedOut } from "./signed-out";
import { SignOut } from "./sign-out";
import { Admin } from "./admin";
import { Saltie } from "./saltie";
import CartStatus from "@/app/_components/CartStatus";

export const Content = () => {
  const session = useSession();

  console.log({ session });

  if (!session.data) {
    return <SignedOut />;
  }

  if (session.data.user.role == "ADMIN") {
    return (
      <>
        <Admin />
        <SignOut />
      </>
    );
  }

  if (session.data.user.role === "CLIENT") {
    return (
      <>
        <CartStatus />
        <SignOut />
      </>
    );
  }

  if (session.data.user.role === "SALTIE") {
    return (
      <>
        <Saltie />
        <SignOut />
      </>
    );
  }
};
