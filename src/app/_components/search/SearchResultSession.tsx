"use client";
import { api } from "@/trpc/react";
import SearchItemShimmer from "./SearchItemShimmer";
import SearchItem from "./SearchItem";

type Props = {
  search: string;
};

const SearchResultsSession = ({ search }: Props) => {
  const {
    data: developers,
    isSuccess: gotDevs,
    isLoading: gettingDevs,
    isError: errorDevs,
  } = api.developer.getBySearch.useQuery({
    search,
  });
  const {
    data: cart,
    isSuccess: gotCart,
    isLoading: gettingCart,
    isError: errorCart,
  } = api.cart.getAll.useQuery();
  return (
    <ul className="flex flex-col gap-4 px-4">
      {gotDevs && gotCart && developers.length === 0 && (
        <p>No results found...</p>
      )}
      {gotDevs &&
        gotCart &&
        developers.map((developer) => (
          <SearchItem
            key={developer.id}
            developer={developer}
            inCart={!!cart.find((i) => i.developerId === developer.id)}
          />
        ))}
      {gettingDevs && gettingCart && <SearchItemShimmer />}
      {(errorCart || errorDevs) && <p>404</p>}
    </ul>
  );
};

export default SearchResultsSession;
