import { useState } from 'react'
import FilterDropdown, { FilterKeyValue } from '@/components/SearchFilters/FilterDropdown'

export type SearchParams = {
  category: string
  minimumAverageRating: number
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
    minimumAverageRating: 0,
  })

  const onCategoryChange = async (newValue: string) => {
    const newSearchParams: SearchParams = {
      ...searchParams,
      category: newValue,
    }

    setSearchParams(newSearchParams)
    onChange(newSearchParams)
  }

  const onRatingChange = async (newValue: string) => {
    const newSearchParams: SearchParams = {
      ...searchParams,
      minimumAverageRating: Number(newValue),
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
        id="average-rating"
        label="Average Rating"
        value={searchParams.minimumAverageRating}
        options={ratingOptions}
        onChange={(value) => onRatingChange(value)}
      />
    </form>
  )
}
export default SearchFilters
