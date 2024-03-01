import { NavbarContent, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { Content } from "./content";

export const Menu = () => {
  return (
    <NavbarContent justify="end">
      <NavbarMenuToggle />
      <NavbarMenu className="z-100 flex flex-col items-center gap-4 pt-10">
        <Content />
      </NavbarMenu>
    </NavbarContent>
  );
};
