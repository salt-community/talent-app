import { getServerAuthSession } from "@/server/auth";
import SearchBar from "./_components/SearchBar";
import EditDeveloperForm from "./_components/EditDeveloperForm";

const Home = async () => {
  const session = await getServerAuthSession();
  return (
    <>
      <div className="flex w-full flex-col items-center bg-gradient-to-b from-orange to-pink py-20 text-2xl font-bold text-white md:text-5xl">
        <div className="flex flex-col gap-2">
          <p>TOMORROW&apos;S DEVELOPERS.</p>
          <p>AVAILABLE.</p>
          <p>TODAY.</p>
        </div>
      </div>
      {session && <SearchBar />}
      <EditDeveloperForm />
    </>
  );
};

export default Home;
