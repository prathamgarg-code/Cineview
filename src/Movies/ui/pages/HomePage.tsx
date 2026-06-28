import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import {
  ContentRow,
  SectionErrorBoundary,
  StatusBlock,
} from '../../../Common'
import { GenreFilter } from '../components/GenreFilter'
import { HeroBanner } from '../components/HeroBanner'
import { MovieCard } from '../components/MovieCard'
import { useHomeController } from '../controllers/useHomeController'

export const HomePage = observer(() => {
  const navigate = useNavigate()
  const {
    heroMovie,
    heroStatus,
    genres,
    genresStatus,
    selectedGenreId,
    setSelectedGenre,
    rows,
  } = useHomeController()

  return (
    <main className="py-4">
      <SectionErrorBoundary title="Hero section failed to load.">
        <StatusBlock status={heroStatus} isEmpty={!heroMovie}>
          {heroMovie && (
            <HeroBanner
              movie={heroMovie}
              onPlayTrailer={() =>
                navigate(`/movies/${heroMovie.id}?trailer=1`)
              }
            />
          )}
        </StatusBlock>
      </SectionErrorBoundary>

      <SectionErrorBoundary title="Genre filter failed to load.">
        <StatusBlock status={genresStatus} isEmpty={genres.length === 0}>
          <GenreFilter
            genres={genres}
            selectedGenreId={selectedGenreId}
            onSelect={setSelectedGenre}
          />
        </StatusBlock>
      </SectionErrorBoundary>

      {rows.map((row) => (
        <SectionErrorBoundary
          key={row.key}
          title={`${row.title} section failed to load.`}
        >
          <StatusBlock status={row.status} isEmpty={row.items.length === 0}>
            <ContentRow title={row.title}>
              {row.items.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ContentRow>
          </StatusBlock>
        </SectionErrorBoundary>
      ))}
    </main>
  )
})