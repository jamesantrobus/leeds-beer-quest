import { useState } from "react"

export type SearchParams = {
  category: string
  minimumValueRating: number
}

type SearchFilterProps = {
  onChange: (searchParams: SearchParams) => void
}

const SearchFilters: React.FC<SearchFilterProps> = ({ onChange }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({ category: '', minimumValueRating: 0 })

  const onCategoryChange = async (newValue: string) => {
    const newSearchParams: SearchParams = { category: newValue, minimumValueRating: searchParams.minimumValueRating }
    setSearchParams(newSearchParams)
    onChange(newSearchParams)
  }

  const onRatingChange = async (newValue: string) => {
    const newSearchParams: SearchParams = { category: searchParams.category, minimumValueRating: Number(newValue) }
    setSearchParams(newSearchParams)
    onChange(newSearchParams)
  }

  return (
    <form className="flex justify-evenly space-x-3 ml-3 mr-3 mb-3">
      <div className="flex-1">
        <label htmlFor="category" className="block mb-1 text-xs font-light text-medium text-gray-900">Venue Type</label>
        <select value={searchParams.category} onChange={(e) => onCategoryChange(e.target.value)} data-cy="category-filter"
          id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2">
          <option value="">All</option>
          <option value="Pub reviews">Pubs</option>
          <option value="Bar reviews">Bars</option>
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="rating" className="block mb-1 text-xs font-light text-gray-900">Value Rating</label>
        <select value={searchParams.minimumValueRating} onChange={(e) => onRatingChange(e.target.value)} data-cy="value-rating-filter"
          id="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2">
          <option value="0">All</option>
          <option value="3">Over 3 stars</option>
          <option value="4">Over 4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
    </form>
  )
}
export default SearchFilters
