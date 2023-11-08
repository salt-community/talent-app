"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = ({className}:{className:string}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogin = () => {
    signIn().catch(() =>
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
  return (
    <>
      {!session && (
        <button className={className} onClick={handleLogin}>
          Sign In
        </button>
      )}
      {session && (
        <button className={className} onClick={handleLogout}>
          Sign Out
        </button>
      )}
    </>
  );
};

export default Login;
