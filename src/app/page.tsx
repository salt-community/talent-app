"use client";

import { isFeatureHeaderV2Enabled } from "@/feature-flags";
import SearchForm from "./_components/search/SearchForm";
import SearchResults from "./_components/search/SearchResults";
import { zSearchFilter } from "@/utils/zodSchema";
import { useSession } from "next-auth/react";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const Home = ({ searchParams }: Props) => {
  const { search } = validateSearchParams({ searchParams });
  const decodedSearch = decodeURIComponent(search);
  const session = useSession();

  const featureHeaderV2Enabled = isFeatureHeaderV2Enabled(session);

  return (
    <main className="flex flex-col items-center">
      {featureHeaderV2Enabled ? null : <SearchForm />}
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
