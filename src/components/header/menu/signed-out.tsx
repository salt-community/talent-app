"use client";

import { Link, NavbarMenuItem } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export const SignedOut = () => {
  return (
    <>
      <NavbarMenuItem>
        <Link href="login">Log In</Link>
      </NavbarMenuItem>
      <NavbarMenuItem className="text-tiny">
        SALT employees log in{" "}
        <Link
          className="text-tiny"
          href="#"
          onClick={() => {
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
