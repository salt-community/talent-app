import type { Session } from "next-auth";
import { redirect } from "next/navigation";

const checkIfAuth = (session: Session | null) => {
  if (!session) {
    redirect("/api/auth/signin");
  }
};

export default checkIfAuth;
