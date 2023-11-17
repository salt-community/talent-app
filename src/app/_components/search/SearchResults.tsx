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
  } = api.developer.getBySearch.useQuery({
    search,
  });
  return (
    <ul data-cy="dev-list" className="flex flex-col gap-4 px-4">
      {gotDevs && developers.length === 0 && (
        <p data-cy="no-listings">No results found...</p>
      )}
      {gotDevs &&
        developers.map((developer) => (
          <SearchItem key={developer.id} developer={developer} />
        ))}
      {gettingDevs && <SearchItemShimmer />}
      {errorDevs && <p>404</p>}
    </ul>
  );
};

export default SearchResults;
