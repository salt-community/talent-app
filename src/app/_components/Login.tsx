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
  return (
    <>
      {!session2 && <button onClick={handleLogin}>Sign In</button>}
      {session2 && <button onClick={handleLogout}>Sign Out</button>}
    </>
  );
};

export default Login;
