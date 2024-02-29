"use client";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/app/assets/icons/Icon";
import CartStatus from "@/app/_components/CartStatus";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";

export const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href={"/"} onClick={() => setIsMenuOpen(false)}>
            <Image
              className="w-24"
              src="/logoBlack.png"
              alt="salt logo"
              width={130}
              height={30}
              data-cy="logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
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
            (session.user.role === "SALTIE" ||
              session.user.role === "ADMIN") && (
              <Link href="/profile">Profile</Link>
            )}
          {session && session.user.role === "CLIENT" && <CartStatus />}
          {!session && (
            <>
              <Link
                className="min-w-[120px] bg-orange px-2 py-1 text-center text-white"
                href={"/login"}
                data-cy="client-sign-in"
              >
                Client Sign In
              </Link>
              <Link
                href={"#"}
                className="min-w-[120px] bg-zinc-100 px-2 py-1 text-center"
                data-cy="salt-sign-in"
                onClick={() => void signIn("google")}
              >
                Salt Sign In
              </Link>
            </>
          )}
          {session && (
            <Link href={"#"} onClick={() => void signOut({ callbackUrl: "/" })}>
              Sign Out
            </Link>
          )}
        </div>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarMenu className="z-50">
        <div className="flex flex-col items-center gap-4">
          {!!session && session.user.role === "ADMIN" && (
            <Link href={"/admin/users"} onClick={() => setIsMenuOpen(false)}>
              <Icon
                icon="admin"
                className="h-10 w-10 fill-black active:fill-orange"
              />
            </Link>
          )}
          {!!session &&
            (session.user.role === "SALTIE" ||
              session.user.role === "ADMIN") && (
              <Link href={"/profile"} onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            )}
          {session && session.user.role === "CLIENT" && <CartStatus />}
          {!session && (
            <>
              <Link
                href="/login"
                className="min-w-[120px] bg-orange px-2 py-1 text-center text-white"
                data-cy="client-sign-in"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Client Sign In
              </Link>
              <Link
                href={"#"}
                className="min-w-[120px] bg-zinc-100 px-2 py-1 text-center"
                data-cy="salt-sign-in"
                onClick={() => {
                  setIsMenuOpen(false);
                  void signIn("google");
                }}
              >
                Salt Sign In
              </Link>
            </>
          )}
          {session && (
            <Link
              href={"#"}
              onClick={() => {
                setIsMenuOpen(false);
                void signOut({ callbackUrl: "/" });
              }}
            >
              Sign Out
            </Link>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
