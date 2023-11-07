"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-12 lg:py-8 ">
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
          <Link
            className="rounded-md bg-orange/20 p-2 font-semibold duration-200 hover:underline active:bg-orange"
            href={"/profile"}
          >
            Profile
          </Link>
        )}
        <Login />
      </div>
    </header>
  );
};

export default Header;
