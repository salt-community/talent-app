"use client";
import { Search, Star, Telescope, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex w-full justify-evenly p-2 text-sm">
        <li className="group">
          <Link
            className={`flex flex-col items-center ${
              pathname.includes("users") && "text-orange"
            }`}
            href={`/admin/users`}
          >
            <UserRound size={36} />
            Users
          </Link>
        </li>
        <li className="group">
          <Link
            className={`flex flex-col items-center ${
              pathname.includes("favorited") && "text-orange"
            }`}
            href={`/admin/favorited`}
          >
            <Star size={36} /> Favorited
          </Link>
        </li>
        <li className="group">
          <Link
            className={`flex flex-col items-center ${
              pathname.includes("visits") && "text-orange"
            }`}
            href={`/admin/visits`}
          >
            <Telescope size={36} /> Visits
          </Link>
        </li>
        <li className="group">
          <Link
            className={`flex flex-col items-center ${
              pathname.includes("search") && "text-orange"
            }`}
            href={`/admin/search`}
          >
            <Search size={36} /> Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
