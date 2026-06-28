import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import {
  ContentRow,
  getBackdropUrl,
  getPosterUrl,
  NullImage,
  SectionErrorBoundary,
  StatusBlock,
} from '../../../Common'
import { CastCarousel } from '../components/CastCarousel'
import { MovieCard } from '../components/MovieCard'
import { TrailerModal } from '../components/TrailerModal'
import { useMovieDetailController } from '../controllers/useMovieDetailController'

export const MovieDetailPage = observer(() => {
  const { movieId } = useParams()
  const id = Number(movieId)
  const {
    movie,
    movieStatus,
    cast,
    castStatus,
    similar,
    similarStatus,
    recommended,
    recommendedStatus,
    notFound,
    trailerVideo,
    isTrailerOpen,
    openTrailer,
    closeTrailer,
  } = useMovieDetailController(id)

  if (notFound) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold">Movie not found</h1>
        <p className="mt-2 text-neutral-500">
          The movie you are looking for does not exist.
        </p>
      </main>
    )
  }

  return (
    <main>
      <SectionErrorBoundary title="Movie details failed to load.">
        <StatusBlock status={movieStatus} isEmpty={!movie}>
          {movie && (
            <section className="relative">
              {getBackdropUrl(movie.backdrop_path) ? (
                <img
                  src={getBackdropUrl(movie.backdrop_path)!}
                  alt={movie.title}
                  className="h-72 w-full object-cover"
                />
              ) : (
                <NullImage className="h-72 w-full" label="No backdrop" />
              )}
              <div className="flex gap-6 p-6">
                {getPosterUrl(movie.poster_path) ? (
                  <img
                    src={getPosterUrl(movie.poster_path)!}
                    alt={movie.title}
                    className="h-64 w-44 rounded-md object-cover"
                  />
                ) : (
                  <NullImage className="h-64 w-44 rounded-md" label="No poster" />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{movie.title}</h1>
                  {movie.tagline && (
                    <p className="mt-1 text-neutral-500">{movie.tagline}</p>
                  )}
                  <p className="mt-2 text-sm text-neutral-600">
                    {movie.release_date} · {movie.runtime ?? '—'} min · ★{' '}
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="mt-2 text-sm">
                    {movie.genres.map((g) => g.name).join(', ')}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed">
                    {movie.overview}
                  </p>
                  <button
                    type="button"
                    onClick={openTrailer}
                    className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </section>
          )}
        </StatusBlock>
      </SectionErrorBoundary>

      <SectionErrorBoundary title="Cast section failed to load.">
        <StatusBlock status={castStatus} isEmpty={cast.length === 0}>
          <h2 className="mb-3 px-4 text-lg font-semibold">Cast</h2>
          <CastCarousel cast={cast} />
        </StatusBlock>
      </SectionErrorBoundary>

      <SectionErrorBoundary title="Similar movies failed to load.">
        <StatusBlock status={similarStatus} isEmpty={similar.length === 0}>
          <ContentRow title="Similar">
            {similar.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </ContentRow>
        </StatusBlock>
      </SectionErrorBoundary>

      <SectionErrorBoundary title="Recommended movies failed to load.">
        <StatusBlock
          status={recommendedStatus}
          isEmpty={recommended.length === 0}
        >
          <ContentRow title="Recommended">
            {recommended.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </ContentRow>
        </StatusBlock>
      </SectionErrorBoundary>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={closeTrailer}
        video={trailerVideo}
      />
    </main>
  )
})