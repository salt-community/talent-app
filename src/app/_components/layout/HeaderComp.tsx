"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import { useSession } from "next-auth/react";
import Icon from "@/app/assets/icons/Icon";

const Header = () => {
  const { data: session } = useSession();
  const className =
    "font-secondary flex items-center tracking-wide text-white text-sm bg-orange hover:bg-hoverGray px-4 py-[6px] xs:px-2 xs:py-[6px] rounded-sm lg:h-9 lg:px-6 lg:text-md";
  return (
    <header className="  mx-auto flex h-14 w-screen items-center justify-between bg-white px-[10px] py-5">
      <Link href={"/"}>
        <Image
          className="w-20 p-2 lg:w-[140px]"
          src="/logoBlack.png"
          alt="salt logo"
          width={130}
          height={30}
        />
      </Link>
      <div className="flex gap-4">
        {!!session && session.user.role === "ADMIN" && (
          <Link href={"/admin"}>
            <Icon
              icon="admin"
              className="h-10 w-10 fill-black active:fill-orange"
            />
          </Link>
        )}
        {!!session &&
          (session.user.role === "SALTIE" || session.user.role === "ADMIN") && (
            <Link className={className} href={"/profile"}>
              Profile
            </Link>
          )}
        {!!session && session.user.role === "CLIENT" && (
          <Link href={"/cart"}>
            <Icon
              icon="cart"
              className="h-10 w-10 fill-black active:fill-orange"
            />
          </Link>
        )}
        <Login className={className} />
      </div>
    </header>
  );
};

export default Header;
