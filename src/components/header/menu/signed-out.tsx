import { Link, NavbarMenuItem } from "@nextui-org/react";

export const SignedOut = () => {
  return (
    <>
      <NavbarMenuItem>
        <Link href="#">Sign In</Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link href="#">Saltie Sign In</Link>
      </NavbarMenuItem>
    </>
  );
};
