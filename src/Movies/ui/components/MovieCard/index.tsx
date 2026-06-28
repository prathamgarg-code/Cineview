import { Link } from 'react-router-dom'
import { NullImage } from '../../../../Common'
import { getPosterUrl } from '../../../../Common'
import type { MovieListItem } from '../../../../Common/core/types/Tmdb.types'

interface MovieCardProps {
  movie: MovieListItem
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = getPosterUrl(movie.poster_path)

  return (
    <article className="w-36 shrink-0">
      <Link to={`/movies/${movie.id}`} className="block">
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} className="h-52 w-full rounded-md object-cover" />
        ) : (
          <NullImage className="h-52 w-full rounded-md" label="No poster" />
        )}
        <h3 className="mt-2 line-clamp-2 text-sm font-medium">{movie.title}</h3>
        <p className="text-xs text-neutral-500">★ {movie.vote_average.toFixed(1)}</p>
      </Link>
      <button
        type="button"
        className="mt-1 text-xs text-neutral-500"
        onClick={() => undefined}
        aria-label="Add to watchlist (coming soon)"
      >
        + Watchlist
      </button>
    </article>
  )
}