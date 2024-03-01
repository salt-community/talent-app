import { NavbarBrand, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";
import { Navbar } from "./navbar";

export const HeaderV2 = () => {
  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <Link href={"/"}>
            <Image
              className="w-24"
              src="/logoBlack.png"
              alt="salt logo"
              width={130}
              height={30}
              data-cy="logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
        <Search />
      </NavbarContent>
    </Navbar>
  );
};
