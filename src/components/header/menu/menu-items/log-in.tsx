"use client";

import { Link, NavbarMenuItem } from "@nextui-org/react";
import { signIn } from "next-auth/react";

type Props = {
  closeMenu: () => void;
};

export const LogIn = ({ closeMenu }: Props) => {
  return (
    <>
      <NavbarMenuItem>
        <Link href="/login" onClick={closeMenu}>
          Log In
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem className="text-tiny">
        SALT employees log in{" "}
        <Link
          className="text-tiny"
          href="#"
          onClick={() => {
            closeMenu();
            void signIn("google");
          }}
        >
          here
        </Link>
        .
      </NavbarMenuItem>
    </>
  );
};
