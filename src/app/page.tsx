"use client";
import { useState } from "react";
import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <main className="flex flex-col gap-2 px-2 pb-2">
      <div className="flex items-center rounded-sm bg-gradient-to-b from-orange to-pink p-2 duration-500 ease-linear md:rounded-md">
        <SearchForm onSearch={(search) => setSearch(search)} />
      </div>
      <SearchResults search={search} />
    </main>
  );
};

export default Home;
