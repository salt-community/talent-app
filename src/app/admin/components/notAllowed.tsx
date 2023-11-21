import type { Session } from "next-auth";
import type { ReactNode } from "react";
type Props = { children: ReactNode; session: Session | null };
const NotAllowed = ({ children, session }: Props) => {
  if (!session) {
    return (
      <main className="flex grow items-center justify-center">
        <p>You are not allowed here!</p>
      </main>
    );
  }
  if (session && session.user.role !== "ADMIN") {
    <main className="flex grow items-center justify-center">
      <p>You are not allowed here {session.user.role}!</p>
    </main>;
  }
  return <>{children}</>;
};

export default NotAllowed;
