import { Link } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <Link
      href={"#"}
      onClick={() => {
        void signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </Link>
  );
};
