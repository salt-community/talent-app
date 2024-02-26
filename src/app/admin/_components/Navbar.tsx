"use client";
import { Search, Star, Telescope, UserRound } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex w-full justify-evenly bg-pink/30 p-2 text-sm">
        <li className="group">
          <Link className="flex flex-col items-center" href={`/admin/users`}>
            <UserRound size={36} />
            Users
          </Link>
        </li>
        <li className="group">
          <Link className="flex flex-col items-center" href={`/admin/users`}>
            <Star size={36} /> Favorited
          </Link>
        </li>
        <li className="group">
          <Link className="flex flex-col items-center" href={`/admin/users`}>
            <Telescope size={36} /> Visits
          </Link>
        </li>
        <li className="group">
          <Link className="flex flex-col items-center" href={`/admin/users`}>
            <Search size={36} /> Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
