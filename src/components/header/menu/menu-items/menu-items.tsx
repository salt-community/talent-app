"use client";

import { useSession } from "next-auth/react";
import { LogIn } from "./log-in";
import { SignOut } from "./sign-out";
import { Admin } from "./admin";
import { Saltie } from "./saltie";
import { FavoritesBadge } from "./favorites-badge";

type Props = {
  closeMenu: () => void;
};

export const MenuItems = ({ closeMenu }: Props) => {
  const session = useSession();

  if (!session.data) {
    return <LogIn closeMenu={closeMenu} />;
  }

  const { role } = session.data.user;

  if (role == "ADMIN") {
    return (
      <>
        <FavoritesBadge closeMenu={closeMenu} />
        <Saltie closeMenu={closeMenu} />
        <Admin closeMenu={closeMenu} />
        <SignOut closeMenu={closeMenu} />
      </>
    );
  }

  if (role === "CLIENT") {
    return (
      <>
        <FavoritesBadge closeMenu={closeMenu} />
        <SignOut closeMenu={closeMenu} />
      </>
    );
  }

  if (role === "SALTIE") {
    return (
      <>
        <FavoritesBadge closeMenu={closeMenu} />
        <Saltie closeMenu={closeMenu} />
        <SignOut closeMenu={closeMenu} />
      </>
    );
  }
};
