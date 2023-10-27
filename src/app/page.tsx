"use client";
import { useState } from "react";
import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div
        className={`flex w-full flex-col items-center bg-gradient-to-b from-orange to-pink duration-500 ease-linear ${
          search ? "py-2" : "py-20"
        } text-xl font-bold text-white md:text-5xl`}
      >
        <div className="flex flex-col gap-2">
          <p>TOMORROW&apos;S DEVELOPERS.</p>
          <p>AVAILABLE.</p>
          <p>TODAY.</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SearchForm onSearch={(search) => setSearch(search)} />
        <SearchResults search={search} />
      </div>
    </>
  );
};

export default Home;
