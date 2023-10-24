import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import { getServerAuthSession } from "@/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();
  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-12 lg:py-8 ">
      <Link href={"/"}>
        <Image src="/logoBlack.png" alt="salt logo" width={130} height={30} />
      </Link>
      <div className="flex gap-2">
        {session && <Link href={"/profile"}>Profile</Link>}
        {session && <Link href={"/addDeveloper"}>Add developer</Link>}
        <Login />
      </div>
    </header>
  );
};

export default Header;
