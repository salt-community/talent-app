"use client";

import { NavbarContent, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { MenuItems } from "./menu-items/menu-items";

type Props = {
  closeMenu: () => void;
};

export const Menu = ({ closeMenu }: Props) => {
  return (
    <NavbarContent justify="end">
      <NavbarMenuToggle />
      <NavbarMenu className="z-100 flex flex-col items-center gap-4 pt-10">
        <MenuItems closeMenu={closeMenu} />
      </NavbarMenu>
    </NavbarContent>
  );
};
