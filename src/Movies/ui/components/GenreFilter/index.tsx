import type { Genre } from '../../../../Common/core/types/Tmdb.types'

interface GenreFilterProps {
  genres: Genre[]
  selectedGenreId: number | null
  onSelect: (genreId: number | null) => void
}

export const GenreFilter = ({ genres, selectedGenreId, onSelect }: GenreFilterProps) => (
  <div className="mb-6 flex flex-wrap gap-2 px-4">
    <button
      type="button"
      onClick={() => onSelect(null)}
      className={`rounded-full px-4 py-1.5 text-sm ${
        selectedGenreId === null
          ? 'bg-neutral-900 text-white'
          : 'bg-neutral-200 text-neutral-700'
      }`}
    >
      All
    </button>
    {genres.map((genre) => (
      <button
        key={genre.id}
        type="button"
        onClick={() => onSelect(genre.id)}
        className={`rounded-full px-4 py-1.5 text-sm ${
          selectedGenreId === genre.id
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-200 text-neutral-700'
        }`}
      >
        {genre.name}
      </button>
    ))}
  </div>
)