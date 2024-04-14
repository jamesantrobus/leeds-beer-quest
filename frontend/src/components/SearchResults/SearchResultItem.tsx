import { VenueRating } from '@/api/getVenues'

type SearchResultItemProps = {
  name: string
  description: string
  rating: VenueRating
  onSelect: () => void
}

const SearchResult: React.FC<SearchResultItemProps> = ({ name, description, rating, onSelect }) => {
  return (
    <div className="cursor-pointer border-b pt-2 pb-2" data-cy="search-result" onClick={onSelect}>
      <div className="flex justify-between">
        <div className="w-full">
          <div className="font-semibold text-blue-950" data-cy="name">
            {name}
          </div>
          <div className="text-xs text-slate-500" data-cy="description">
            {description}
          </div>
        </div>

        <div className="flex flex-col w-10 justify-center items-center">
          <div>⭐️</div>
          <div className="text-sm font-bold text-blue-950" data-cy="star-rating">
            {rating.average.toFixed(2)}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  )
}
export default SearchResult
