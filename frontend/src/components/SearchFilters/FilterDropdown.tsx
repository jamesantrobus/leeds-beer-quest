export type FilterKeyValue = { label: string; value: string | number }

export type FilterDropdownProps = {
  id: string
  label: string
  value: string | number
  options: FilterKeyValue[]
  onChange: (value: string) => void
}

const FilterDropdown = ({ id, label, value, options, onChange }: FilterDropdownProps) => {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block mb-1 text-xs font-light text-medium text-gray-900">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-cy={`${id}-filter`}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
      >
        {options.map((o) => (
          <option key={`${id}-${o.value}`} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterDropdown
