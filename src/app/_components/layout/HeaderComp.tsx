"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  const className =
    "hover:underline font-semibold duration-200 bg-orange/20 active:bg-orange px-2 py-1 rounded-md";
  return (
    <header className="flex items-center justify-between px-5 py-3 md:px-12 lg:py-8 ">
      <Link href={"/"}>
        <Image
          className="w-20 md:w-auto"
          src="/logoBlack.png"
          alt="salt logo"
          width={130}
          height={30}
        />
      </Link>
      <div className="flex gap-2">
        {session.status === "authenticated" && (
          <Link className={className} href={"/profile"}>
            Profile
          </Link>
        )}
        <Login className={className} />
      </div>
    </header>
  );
};

export default Header;
