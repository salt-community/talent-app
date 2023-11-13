import React from "react";

const UserCardShimmer = () => {
  return (
    <div className="my-2 flex h-[12rem] w-[12rem] animate-pulse flex-col items-center rounded-lg bg-gray p-4 duration-500">
      <div className=" mb-4 h-24 w-24 rounded-full bg-black/10"></div>
      <div className="mb-4 h-4 w-full rounded bg-black/10"></div>
      <div className="h-4 w-full rounded bg-black/10"></div>
    </div>
  );
};

export default UserCardShimmer;
