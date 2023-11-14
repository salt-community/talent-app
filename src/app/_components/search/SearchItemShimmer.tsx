import React from "react";

const SearchItemShimmer = () => {
  return (
    <>
      {Array(10)
        .fill(1)
        .map((_, index) => {
          return (
            <li
              data-cy="loading-shimmer"
              key={`shimmer-${index}`}
              className="flex h-28 animate-pulse items-center gap-4 rounded-sm bg-gray p-2 drop-shadow-md duration-500 lg:px-9"
            >
              <div className="h-20 w-20 shrink-0 rounded-full bg-black/10 p-2"></div>
              <div className="flex h-full w-full flex-col justify-evenly">
                <div className="h-4 w-2/5 rounded bg-black/10"></div>
                <div className={`h-4 w-full rounded bg-black/10`}></div>
              </div>
            </li>
          );
        })}
    </>
  );
};

export default SearchItemShimmer;
