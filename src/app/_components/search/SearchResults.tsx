import { api } from "@/trpc/react";
import SearchItem from "./SearchItem";
import SearchItemShimmer from "./SearchItemShimmer";

type Props = {
  search: string;
};

const SearchResults = ({ search }: Props) => {
  const { data, isSuccess, isLoading, isError } =
    api.developer.getBySearch.useQuery({
      search,
    });

  return (
    <ul className="flex flex-col gap-2 px-4">
      {isSuccess && data.length === 0 && <p>No results found...</p>}
      {isSuccess &&
        data.length !== 0 &&
        data.map((developer) => (
          <SearchItem key={developer.id} developer={developer} />
        ))}
      {isLoading && (
        <>
          <SearchItemShimmer />
          <SearchItemShimmer />
          <SearchItemShimmer />
          <SearchItemShimmer />
          <SearchItemShimmer />
        </>
      )}
      {isError && <p>404</p>}
    </ul>
  );
};

export default SearchResults;
