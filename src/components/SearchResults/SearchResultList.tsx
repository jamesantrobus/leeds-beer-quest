import { Venue } from '@/api/getVenues'
import SearchResultItem from '@/components/SearchResults/SearchResultItem'

type SearchResultListProps = {
  venues?: Venue[]
  onSelect: (venue: Venue) => void
}

const SearchResult: React.FC<SearchResultListProps> = ({ venues, onSelect }) => {
  return (
    <div className="pl-3 pr-3 overflow-auto">
      {venues && venues.length === 0 && (
        <div className="border-b pt-2 pb-2" data-cy="no-results">
          No venues match this search
        </div>
      )}
      {venues?.map((venue, index) => (
        <SearchResultItem
          key={index}
          name={venue.name}
          description={venue.description}
          rating={venue.rating}
          onSelect={() => onSelect(venue)}
        />
      ))}
    </div>
  )
}
export default SearchResult
