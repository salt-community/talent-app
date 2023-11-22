"use client";
import { api } from "@/trpc/react";
import SearchItemShimmer from "./SearchItemShimmer";
import SearchItem from "./SearchItem";
import { useRef } from "react";
import type { RouterOutputs } from "@/trpc/shared";
type Dev = RouterOutputs["developer"]["getBySearch"][number];

type Props = {
  search: string;
};
const SearchResults = ({ search }: Props) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const handleLocalStorage = (devs: Dev[]) => {
    localStorage.setItem(
      "next-devs",
      JSON.stringify({
        search,
        scrollPosition: scrollRef.current ? scrollRef.current.scrollTop : 0,
        devs: devs.map(({ slug }) => ({ slug })),
      }),
    );
  };
  const {
    data: developers,
    isSuccess: gotDevs,
    isLoading: gettingDevs,
    isError: errorDevs,
  } = api.developer.getBySearch.useQuery(
    {
      search,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
  if (gotDevs) {
  }
  return (
    <ul
      ref={scrollRef}
      data-cy="dev-list"
      className="flex h-full w-full max-w-5xl flex-col gap-4 overflow-y-auto p-2"
    >
      {gotDevs && developers.length === 0 && (
        <p data-cy="no-listings">No results found...</p>
      )}
      {gotDevs &&
        [...developers].map((developer) => (
          <SearchItem
            key={developer.id}
            developer={developer}
            storeScroll={() => handleLocalStorage(developers)}
          />
        ))}
      {gettingDevs && <SearchItemShimmer />}
      {errorDevs && <p>Something went wrong...</p>}
    </ul>
  );
};

export default SearchResults;
