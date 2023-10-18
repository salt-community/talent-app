import { getServerAuthSession } from "@/server/auth";
import SearchBar from "./_components/SearchBar";

const Home = async () => {
  const session = await getServerAuthSession();
  return (
    <>
      <div className="from-orange to-pink flex w-full flex-col items-center bg-gradient-to-b py-20 text-2xl font-bold text-white md:text-5xl">
        <div className="flex flex-col gap-2">
          <p>TOMORROW&apos;S DEVELOPERS.</p>
          <p>AVAILABLE.</p>
          <p>TODAY.</p>
        </div>
      </div>
      {session && <SearchBar />}
    </>
  );
}

export default Home