"use client";

import { useSession } from "next-auth/react";
import { LogIn } from "./log-in";
import { SignOut } from "./sign-out";
import { Admin } from "./admin";
import { Saltie } from "./saltie";
import { FavoritesBadge } from "./favorites-badge";

export const MenuItems = () => {
  const session = useSession();

  if (!session.data) {
    return <LogIn />;
  }

  const { role } = session.data.user;

  if (role == "ADMIN") {
    return (
      <>
        <FavoritesBadge />
        <Saltie />
        <Admin />
        <SignOut />
      </>
    );
  }

  if (role === "CLIENT") {
    return (
      <>
        <FavoritesBadge />
        <SignOut />
      </>
    );
  }

  if (role === "SALTIE") {
    return (
      <>
        <FavoritesBadge />
        <Saltie />
        <SignOut />
      </>
    );
  }
};
