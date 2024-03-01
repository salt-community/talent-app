import { Navbar as NextNavbar } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export const Navbar = ({ isMenuOpen, setIsMenuOpen, children }: Props) => {
  return (
    <NextNavbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1"
    >
      {children}
    </NextNavbar>
  );
};
