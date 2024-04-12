import { useState } from 'react'
import FilterDropdown, { FilterKeyValue } from '@/components/SearchFilters/FilterDropdown'

export type SearchParams = {
  category: string
  minimumValueRating: number
}

type SearchFilterProps = {
  onChange: (searchParams: SearchParams) => void
}

const categoryOptions: FilterKeyValue[] = [
  { label: 'All', value: '' },
  { label: 'Pubs', value: 'Pub reviews' },
  { label: 'Bars', value: 'Bar reviews' },
]

const ratingOptions: FilterKeyValue[] = [
  { label: 'All', value: '0' },
  { label: 'Over 3 stars', value: '3' },
  { label: 'Over 4 stars', value: '4' },
  { label: '5 stars', value: '5' },
]

const SearchFilters: React.FC<SearchFilterProps> = ({ onChange }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    category: '',
    minimumValueRating: 0,
  })

  const onCategoryChange = async (newValue: string) => {
    const newSearchParams: SearchParams = {
      category: newValue,
      minimumValueRating: searchParams.minimumValueRating,
    }
    setSearchParams(newSearchParams)
    onChange(newSearchParams)
  }

  const onRatingChange = async (newValue: string) => {
    const newSearchParams: SearchParams = {
      category: searchParams.category,
      minimumValueRating: Number(newValue),
    }
    setSearchParams(newSearchParams)
    onChange(newSearchParams)
  }

  return (
    <form className="flex justify-evenly space-x-3 ml-3 mr-3 mb-3">
      <FilterDropdown
        id="category"
        label="Venue Type"
        value={searchParams.category}
        options={categoryOptions}
        onChange={(value) => onCategoryChange(value)}
      />
      <FilterDropdown
        id="value-rating"
        label="Value Rating"
        value={searchParams.minimumValueRating}
        options={ratingOptions}
        onChange={(value) => onRatingChange(value)}
      />
    </form>
  )
}
export default SearchFilters
