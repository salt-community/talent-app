import React from "react";

const SearchItemShimmer = () => {
  return (
    <>
      <div
        data-cy="loading-shimmer"
        className="my-2 h-[9rem] animate-pulse rounded-lg bg-gray p-4 shadow-lg duration-500"
      >
        <div className=" mb-4 h-12 w-12 rounded-full bg-black/10"></div>
        <div className="mb-4 h-4 w-4/5 rounded bg-black/10"></div>
        <div className="h-4 w-3/5 rounded bg-black/10"></div>
      </div>
    </>
  );
};

export default SearchItemShimmer;
