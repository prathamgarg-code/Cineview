import { Link } from 'react-router-dom'
import { getBackdropUrl, NullImage } from '../../../../Common'
import type { MovieListItem } from '../../../../Common/core/types/Tmdb.types'

interface HeroBannerProps {
  movie: MovieListItem
  onPlayTrailer: () => void
}

export const HeroBanner = ({ movie, onPlayTrailer }: HeroBannerProps) => {
  const backdropUrl = getBackdropUrl(movie.backdrop_path)

  return (
    <section className="relative mb-8 h-[420px] overflow-hidden">
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <NullImage className="absolute inset-0 h-full w-full" label="No backdrop" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end p-8 text-white">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-200">{movie.overview}</p>
        <p className="mt-2 text-sm">★ {movie.vote_average.toFixed(1)}</p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onPlayTrailer}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
          >
            Watch Trailer
          </button>
          <Link
            to={`/movies/${movie.id}`}
            className="rounded-md border border-white px-4 py-2 text-sm font-medium"
          >
            More Info
          </Link>
        </div>
      </div>
    </section>
  )
}