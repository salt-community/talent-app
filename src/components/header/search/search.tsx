"use client";
import { Input, NavbarContent } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./search-icon";

const route = (search: string) => {
  if (!search) {
    return "/";
  }
  return `/?search=${encodeURIComponent(search)}`;
};

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <NavbarContent>
      <Input
        placeholder="Search for talents..."
        size="lg"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            router.push(route(search));
          }
        }}
        startContent={<SearchIcon />}
      />
    </NavbarContent>
  );
};
