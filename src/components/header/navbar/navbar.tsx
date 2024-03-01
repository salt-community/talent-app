import { Navbar as NextNavbar } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
};

export const Navbar = ({ children }: Props) => {
  return (
    <NextNavbar className="bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1">
      {children}
    </NextNavbar>
  );
};
