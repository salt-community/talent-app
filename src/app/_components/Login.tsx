"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {!session && (
        <>
          <Button
            data-cy="client-sign-in"
            callToAction
            onClick={() => router.push("/login")}
          >
            Client Sign In
          </Button>
          <Button
            data-cy="salt-sign-in"
            onClick={() => void signIn("google")}
          >
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
