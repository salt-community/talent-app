'use client'
import { queryConsultants } from '@/server/server-actions';
import React, { useEffect, useState } from 'react'
import SearchItem from './SearchItem';
import { Consultant } from 'types';

type Props = {}

const SearchBar = (props: Props) => {
  const [consultants, setConsultants] = useState<Consultant[]>();
  const [search, setSearch] = useState("");
  useEffect(() => {
    queryConsultants("")
      .then((res) => setConsultants(res))
      .catch((err: Error) => console.log(err.message));
  }, []);

  return (
    <div className='flex flex-col gap-4'>
        <form
          className="flex gap-2 pt-4 md:w-1/3"
          onSubmit={(e) => {
            e.preventDefault();
            queryConsultants(search)
              .then((res) => setConsultants(res))
              .catch((err: Error) => console.log(err.message));
          }}
          action=""
        >
          <input
            className="min-w-0 grow rounded-md border-2 border-black/50 px-2"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <button className="bg-orange rounded-lg border-2 border-black/30 px-4 py-2 text-white">
            Search
          </button>
        </form>
        <ul className="flex flex-col gap-2">
          {consultants ? (
            consultants.length === 0 ? (
              <p className="text-2xl font-semibold">No results found...</p>
            ) : (
              consultants.map((consultant) => (
                <SearchItem key={consultant.id} consultant={consultant} />
              ))
            )
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
  )
}

export default SearchBar