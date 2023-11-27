import { Skeleton } from "react-activity-calendar";

const DevShimmer = () => {
  return (
    <main className="flex grow animate-pulse flex-col items-center gap-5 pb-5 pt-5 md:px-5">
      <div className="flex w-full max-w-5xl items-center justify-between gap-2 rounded-md border border-black/20 bg-gray p-5 pt-10 shadow-lg">
        <div className="flex w-full animate-pulse flex-col items-center gap-4">
          <div className="h-28 w-28 rounded-full bg-black/10"></div>
          <div className="h-6 w-3/5 rounded bg-black/10"></div>
          <div className="h-4 w-2/5 rounded bg-black/10"></div>
          <div className="h-4 w-2/5 rounded bg-black/10"></div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-black/10"></div>
            <div className="h-10 w-10 rounded-full bg-black/10"></div>
          </div>
        </div>
      </div>
      <section className="flex w-full grow flex-col gap-10 bg-gray px-5 pt-5 md:max-w-5xl md:rounded-md">
        <nav className="flex animate-pulse justify-around">
          {["Skills", "Bio", "Projects"].map((i) => (
            <div
              key={`${i}-button`}
              className="border-black/15 w-1/4 select-none rounded-lg bg-orange/10 py-1 text-center font-primary font-semibold tracking-widest text-transparent md:tracking-wide lg:w-1/6"
            >
              {i}
            </div>
          ))}
        </nav>
        <div className="flex animate-pulse flex-col gap-4">
          <div className="flex h-10 w-full animate-pulse flex-wrap gap-2 rounded-md lg:h-8">
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
            <div className="w-16 rounded bg-black/10 md:w-32"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton
            colorScheme="light"
            loading
            style={{
              fill: "#353535",
              opacity: "10%",
              animation: "infinite",
              animationName: "Shimmerpulse",
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default DevShimmer;
