import { api } from '@/trpc/react'
import { FC } from 'react'
import SearchItem from './SearchItem'

type Props = {
  search: string
}

const SearchResults: FC<Props> = ({search}) => {
  console.log('made search with', search);
  const data = api.developer.getSearchedDevelopers.useQuery({search})
  const developers = data.data
  return (
    <ul className="flex flex-col gap-2">
    {developers ? (
      developers.length === 0 ? (
        <p className="text-2xl font-semibold">No results found...</p>
      ) : (
        developers.map((consultant) => (
          <SearchItem key={consultant.id} consultant={consultant} />
        ))
      )
    ) : (
      <p>Loading...</p>
    )}
  </ul>
  )
}

export default SearchResults