"use client";
import { useState } from "react";
import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";
import { useSession } from "next-auth/react";
import SearchResultsSession from "./_components/search/SearchResultSession";

const Home = () => {
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  return (
    <main className="mt-2 flex flex-col gap-y-4 pb-2 ">
      <div className=" flex h-20 flex-col items-center justify-center rounded-sm bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] px-4 lg:h-96">
        <h1 className="hidden lg:mb-7 lg:flex lg:text-center lg:font-secondary lg:text-5xl lg:font-bold lg:text-white">
          Tomorrow&apos;s Full-Stack Developers. <br /> Available Today
        </h1>
        <SearchForm onSearch={(search) => setSearch(search)} />
      </div>
      {session && session.user.role === "CLIENT" ? (
        <SearchResultsSession search={search} />
      ) : (
        <SearchResults search={search} />
      )}
    </main>
  );
};

export default Home;
