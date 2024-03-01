import { Link, NavbarMenuItem } from "@nextui-org/react";

export const SignedOut = () => {
  return (
    <>
      <NavbarMenuItem>
        <Link href="#">Sign In</Link>
      </NavbarMenuItem>
      <NavbarMenuItem className="text-tiny">
        SALT employees sign in{" "}
        <Link className="text-tiny" href="#">
          here
        </Link>
        .
      </NavbarMenuItem>
    </>
  );
};
