import React from 'react';


const SearchItemShimmer = () => {
  return (
    <>
    <div className="p-4 bg-gray rounded-lg shadow-lg animate-pulse duration-500 h-[9rem] my-2">
      <div className=' h-12 w-12 rounded-full bg-slate-200 mb-4'></div>
      <div className="h-4 bg-slate-200 rounded w-4/5 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-3/5"></div>
    </div>
    </>
  );
};

export default SearchItemShimmer;
