"use client";

import { Search } from "./search";
import { Navbar } from "./navbar";
import { Brand } from "./brand";
import { Menu } from "./menu";
import { useState } from "react";

export const HeaderV2 = () => {
  const [isMenuOpen, setIsMenuOpenState] = useState(false);

  const setIsMenuOpen = (open: boolean) => {
    setIsMenuOpenState(open);
  };

  const closeMenu = () => {
    setIsMenuOpenState(false);
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
      <Brand closeMenu={closeMenu} />
      <Search />
      <Menu closeMenu={closeMenu} />
    </Navbar>
  );
};
