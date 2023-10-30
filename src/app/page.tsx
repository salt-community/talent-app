"use client";
import { useState } from "react";
import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center rounded-sm bg-gradient-to-b from-orange to-pink p-4 duration-500 ease-linear md:rounded-md">
        <SearchForm onSearch={(search) => setSearch(search)} />
      </div>
      <div className="flex flex-col gap-2">
        <SearchResults search={search} />
      </div>
    </div>
  );
};

export default Home;
