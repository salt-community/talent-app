import Image from "next/image";
import Link from "next/link";
import Login from "./Login";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-12 lg:py-8 ">
      <Link href={"/"}>
        <Image src="/logoBlack.png" alt="salt logo" width={130} height={30} />
      </Link>
      <Login />
    </header>
  );
};

export default Header;
