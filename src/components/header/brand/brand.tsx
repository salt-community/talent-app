import { NavbarBrand, NavbarContent, Image } from "@nextui-org/react";
import Link from "next/link";

export const Brand = () => {
  return (
    <NavbarContent>
      <NavbarBrand>
        <Link href={"/"}>
          <Image src="/logoBlack.png" alt="salt logo" width={96} />
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};
