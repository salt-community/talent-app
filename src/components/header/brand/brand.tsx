import { NavbarBrand, NavbarContent, Image } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  closeMenu: () => void;
};

export const Brand = ({ closeMenu }: Props) => {
  return (
    <NavbarContent justify="start">
      <NavbarBrand>
        <Link
          href="/"
          onClick={() => {
            closeMenu();
          }}
        >
          <Image src="/logoBlack.png" alt="salt logo" width={64} />
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};
