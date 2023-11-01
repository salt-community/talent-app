"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const { data: session2 } = useSession();
  const router = useRouter();
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" }).catch(() =>
      toast.error("Could not log in."),
    );
  };
  const handleLogout = () => {
    signOut()
      .then(() => {
        router.push("/");
      })
      .catch(() => toast.error("Could not log out."));
  };
  const className = "hover:underline font-semibold duration-200 bg-orange/20 active:bg-orange p-2 rounded-md";
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
