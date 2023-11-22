"use client";
import { api } from "@/trpc/react";
import SearchItemShimmer from "./SearchItemShimmer";
import SearchItem from "./SearchItem";

type Props = {
  search: string;
};

const SearchResults = ({ search }: Props) => {
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
    localStorage.setItem(
      "next-devs",
      JSON.stringify(developers.map(({ slug }) => ({ name: slug }))),
    );
  }
  return (
    <ul data-cy="dev-list" className="flex flex-col gap-4 p-2">
      {gotDevs && developers.length === 0 && (
        <p data-cy="no-listings">No results found...</p>
      )}
      {gotDevs &&
        developers.map((developer) => (
          <SearchItem key={developer.id} developer={developer} />
        ))}
      {gettingDevs && <SearchItemShimmer />}
      {errorDevs && <p>Something went wrong...</p>}
    </ul>
  );
};

export default SearchResults;
