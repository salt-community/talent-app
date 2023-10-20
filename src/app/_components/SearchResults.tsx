import { api } from "@/trpc/react";
import type { FC } from "react";
import SearchItem from "./SearchItem";
import SearchItemShimmer from "./SearchItemShimmer";

type Props = {
  search: string;
};

const SearchResults: FC<Props> = ({ search }) => {
  const { data, isSuccess } = api.developer.getBySearch.useQuery({
    search,
  });

  return (
    <ul className="flex flex-col gap-2">
      {isSuccess ? (
        data.length === 0 ? (
          <p className="text-2xl font-semibold"> No results found...</p>
        ) : (
          data.map((consultant) => (
            <SearchItem key={consultant.id} consultant={consultant} />
          ))
        )
      ) : (
        <>
          <SearchItemShimmer />
          <SearchItemShimmer />
          <SearchItemShimmer />
          <SearchItemShimmer />
          <SearchItemShimmer />
        </>
      )}
    </ul>
  );
};

export default SearchResults;
