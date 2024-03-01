import { Link, NavbarMenuItem } from "@nextui-org/react";

export const SignedOut = () => {
  return (
    <>
      <NavbarMenuItem>
        <Link href="login">Log In</Link>
      </NavbarMenuItem>
      <NavbarMenuItem className="text-tiny">
        SALT employees log in{" "}
        <Link className="text-tiny" href="#">
          here
        </Link>
        .
      </NavbarMenuItem>
    </>
  );
};
