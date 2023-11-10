"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = ({ className }: { className: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {!session && (
        <>
          <Link className={className} href={"/login"}>
            Client Sign In
          </Link>
          <button className={className} onClick={() => void signIn("google")}>
            Salt Sign In
          </button>
        </>
      )}
      {session && (
        <button
          className={className}
          onClick={() => void signOut().then(() => router.push("/"))}
        >
          Sign Out
        </button>
      )}
    </>
  );
};

export default Login;
