"use client";
import Icon from "@/app/assets/icons/Icon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

const SearchForm = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (!!debouncedSearch) {
      const encodedSearch = encodeURIComponent(debouncedSearch);
      router.push(`?search=${encodedSearch}`);
    }
  }, [debouncedSearch, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`?search=${debouncedSearch}`);
      }}
      className="flex gap-2 rounded-sm bg-white md:w-3/5 lg:w-[400px]"
    >
      <input
        data-cy="searchbar"
        className="grow px-2 py-1 placeholder-black/80 outline-none placeholder:font-primary placeholder:text-sm placeholder:font-light"
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
        placeholder="Search"
      />
      <button data-cy="search-submit" type="submit">
        <Icon
          className="h-6 w-8 fill-black/25 hover:fill-orange"
          icon="search"
        />
      </button>
    </form>
  );
};

export default SearchForm;
