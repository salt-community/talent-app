import { Link } from "@nextui-org/react";
import { signOut } from "next-auth/react";

type Props = {
  closeMenu: () => void;
};

export const SignOut = ({ closeMenu }: Props) => {
  return (
    <Link
      href={"#"}
      onClick={() => {
        closeMenu();
        void signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </Link>
  );
};
