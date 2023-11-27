import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";
import { zSearchFilter } from "@/utils/zodSchema";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const Home = ({ searchParams }: Props) => {
  const { search } = validateSearchParams({ searchParams });
  const decodedSearch = decodeURIComponent(search);
  return (
    <main className="flex h-[calc(100vh-57px)] flex-col items-center gap-1">
      <div className="flex h-20 w-full flex-col items-center justify-center bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] lg:h-96 lg:gap-7">
        <h1 className="hidden lg:flex lg:text-center lg:font-secondary lg:text-5xl lg:font-bold lg:text-white">
          Tomorrow&apos;s Full-Stack Developers. <br /> Available Today.
        </h1>
        <SearchForm />
      </div>
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
