"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session2 } = useSession();
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" }).catch(() =>
      console.log("Could not log in."),
    );
  };
  const handleLogout = () => {
    signOut().catch(() => console.log("Could not log in."));
  };
  const className = "text-black hover:underline";
  return (
    <>
      {!session2 && (
        <button className={className} onClick={handleLogin}>
          Sign In
        </button>
      )}
      {session2 && (
        <button className={className} onClick={handleLogout}>
          Sign Out
        </button>
      )}
    </>
  );
};

export default Login;
