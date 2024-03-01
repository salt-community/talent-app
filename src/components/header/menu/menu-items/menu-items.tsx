"use client";

import { useSession } from "next-auth/react";
import { LogIn } from "./log-in";
import { SignOut } from "./sign-out";
import { Admin } from "./admin";
import { Saltie } from "./saltie";
import { FavoritesBadge } from "../favorites-badge";

export const MenuItems = () => {
  const session = useSession();

  if (!session.data) {
    return <LogIn />;
  }

  if (session.data.user.role == "ADMIN") {
    return (
      <>
        <Admin />
        <FavoritesBadge />
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
        <FavoritesBadge />
        <SignOut />
      </>
    );
  }
};
