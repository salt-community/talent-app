import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";
import { zSearchFilter } from "@/utils/zodSchema";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const Home = ({ searchParams }: Props) => {
  const { search } = validateSearchParams({ searchParams });
  const decodedSearch = decodeURIComponent(search);
  const ffHeaderV2 = process.env.NEXT_PUBLIC_FF_HEADER_V2 === "ON";
  return (
    <main className="flex flex-col items-center">
      {ffHeaderV2 ?? <SearchForm />}
      <SearchResults search={decodedSearch} />
    </main>
  );
};

const validateSearchParams = ({ searchParams }: Props) => {
  const parsed = zSearchFilter.safeParse(searchParams);
  if (!parsed.success) {
    return { search: "" };
  }
  return parsed.data;
};

export default Home;
