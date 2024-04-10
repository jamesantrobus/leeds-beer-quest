import { Venue } from "@/pages/api/venues"
import SearchResultItem from "@/components/SearchResultItem"

type SearchResultListProps = {
    venues: Venue[]
    onSelect: (venue: Venue) => void
}

const SearchResult: React.FC<SearchResultListProps> = ({ venues, onSelect }) => {
    return (
        <div className="pl-3 pr-3 overflow-auto">
          {venues.map((venue, index) => (
            <SearchResultItem key={index} name={venue.name} description={venue.description} rating={venue.rating} onSelect={() => onSelect(venue)} />
          ))}
        </div>
  )
}
export default SearchResult
