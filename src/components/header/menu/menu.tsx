import { NavbarContent, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { SignedOut } from "./signed-out";

export const Menu = () => {
  return (
    <NavbarContent justify="end">
      <NavbarMenuToggle />
      <NavbarMenu className="z-100 flex flex-col items-center gap-4 pt-10">
        <SignedOut />
      </NavbarMenu>
    </NavbarContent>
  );
};
