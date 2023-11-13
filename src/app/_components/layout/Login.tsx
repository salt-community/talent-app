"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../Button";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {!session && (
        <>
          <Button callToAction onClick={() => router.push("/login")}>
            Client Sign In
          </Button>
          <Button callToAction onClick={() => void signIn("google")}>
            Salt Sign In
          </Button>
        </>
      )}
      {session && (
        <Button onClick={() => void signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      )}
    </>
  );
};

export default Login;
