interface FilterOption {
  label: string
  voteGte?: number
  voteLte?: number
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체 별점' },
  { label: '9점 이상', voteGte: 9 },
  { label: '8점 이상', voteGte: 8 },
  { label: '7점 이상', voteGte: 7 },
  { label: '6점 이상', voteGte: 6 },
  { label: '5점 이하', voteLte: 5 },
]

interface MovieFilterProps {
  voteGte?: number
  voteLte?: number
  onChange: (voteGte?: number, voteLte?: number) => void
}

const MovieFilter = ({ voteGte, voteLte, onChange }: MovieFilterProps) => {
  const currentValue = FILTER_OPTIONS.findIndex(
    (opt) => opt.voteGte === voteGte && opt.voteLte === voteLte,
  )

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = FILTER_OPTIONS[Number(e.target.value)]
    if (option) onChange(option.voteGte, option.voteLte)
  }

  return (
    <select
      value={currentValue === -1 ? 0 : currentValue}
      onChange={handleChange}
      className="bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
    >
      {FILTER_OPTIONS.map((option, index) => (
        <option key={option.label} value={index}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default MovieFilter