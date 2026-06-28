interface RecentSearchesProps {
    items: string[]
    onSelect: (query: string) => void
  }
  
  export const RecentSearches = ({ items, onSelect }: RecentSearchesProps) => {
    if (items.length === 0) return null
  
    return (
      <section className="mb-6 px-4">
        <h2 className="mb-2 text-sm font-semibold text-neutral-700">Recent searches</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-700"
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    )
  }