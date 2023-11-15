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
    <header className="flex h-14 items-center justify-between bg-white px-[10px] py-5">
      <Link href={"/"}>
        <Image
          className="w-20 p-2 lg:w-[140px]"
          src="/logoBlack.png"
          alt="salt logo"
          width={130}
          height={30}
          data-cy="logo"
        />
      </Link>
      <div className="flex items-center gap-4">
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
            <Button onClick={() => router.push("/profile")}>Profile</Button>
          )}
        {session && session.user.role === "CLIENT" && <CartStatus />}
        <Login />
      </div>
    </header>
  );
};

export default Header;
