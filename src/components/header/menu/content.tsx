"use client";

import { useSession } from "next-auth/react";
import { SignedOut } from "./signed-out";
import { SignOut } from "./sign-out";
import { Admin } from "./admin";
import { Saltie } from "./saltie";
import { FavoritesBadge } from "./favorites-badge";

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
        <FavoritesBadge />
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
