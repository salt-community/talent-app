import { Navbar, NavbarContent } from "@nextui-org/react";
import { Search } from "./search";

export const HeaderV2 = () => {
  return (
    <Navbar className="bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)]">
      <NavbarContent>
        <Search />
      </NavbarContent>
    </Navbar>
  );
};
