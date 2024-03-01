import { Link } from "@nextui-org/react";

type Props = {
  closeMenu: () => void;
};

export const Admin = ({ closeMenu }: Props) => {
  return (
    <Link href={"/admin/users"} onClick={closeMenu}>
      SALT Admin
    </Link>
  );
};
