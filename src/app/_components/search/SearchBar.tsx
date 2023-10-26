"use client";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { useSession } from "next-auth/react";
import Button from "../Button";

const SearchBar = () => {
  const session = useSession();
  const [search, setSearch] = useState("");
  const [finalSearch, setFinalSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      {session.status === "authenticated" && (
        <form
          className="flex gap-2 pt-4 md:w-1/3"
          onSubmit={(e) => {
            e.preventDefault();
            setFinalSearch(search);
          }}
        >
          <input
            className="min-w-0 grow rounded-md border-2 border-black/50 px-2"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <Button className="px-5 py-5" inverted>
            Search
          </Button>
        </form>
      )}
      {finalSearch && <SearchResults search={finalSearch} />}
    </div>
  );
};

export default SearchBar;
