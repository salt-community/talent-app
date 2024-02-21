"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import { useSession } from "next-auth/react";
import Icon from "@/app/assets/icons/Icon";
import { useRouter } from "next/navigation";
import Button from "./Button";
import CartStatus from "./CartStatus";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 flex h-[76px] w-full items-center justify-between bg-white px-4 py-3">
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
      <div className="flex items-center gap-4">
        {!!session && session.user.role === "ADMIN" && (
          <Link href={"/admin/users"}>
            <Icon
              icon="admin"
              className="h-10 w-10 fill-black active:fill-orange"
            />
          </Link>
        )}
        {!!session &&
          (session.user.role === "SALTIE" || session.user.role === "ADMIN") && (
            <Button onClick={() => router.push("/profile")}>Profile</Button>
          )}
        {session && session.user.role === "CLIENT" && <CartStatus />}
        <Login />
      </div>
    </header>
  );
};

export default Header;
