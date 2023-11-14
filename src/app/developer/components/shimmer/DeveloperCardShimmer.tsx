import React from "react";

const DeveloperCardShimmer = () => {
  return (
    <div className="my-2 h-[24rem] animate-pulse rounded-lg bg-gray p-4 duration-500">
      <div className="mb-4 h-4 w-10/12 rounded bg-black/10"></div>
      <div className="mb-4 h-4 w-10/12 rounded bg-black/10"></div>
      <div className="mb-4 h-4 w-6/12 rounded bg-black/10"></div>
      <div className="mb-4 h-4 w-6/12 rounded bg-black/10"></div>
      <div className="mb-4 h-4 w-6/12 rounded bg-black/10"></div>
      <div className="mb-4 h-24 bg-black/10 lg:h-48"></div>
    </div>
  );
};

export default DeveloperCardShimmer;
