import { NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export const Brand = () => {
  return (
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
  );
};
