import { Link } from "@nextui-org/react";

type Props = {
  closeMenu: () => void;
};

export const Saltie = ({ closeMenu }: Props) => {
  return (
    <Link href="/profile" onClick={closeMenu}>
      Profile
    </Link>
  );
};
