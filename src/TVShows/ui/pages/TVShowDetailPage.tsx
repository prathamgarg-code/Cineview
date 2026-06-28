import { observer } from 'mobx-react-lite'
import { Outlet, useParams } from 'react-router-dom'
import {
  getBackdropUrl,
  getPosterUrl,
  NullImage,
  SectionErrorBoundary,
  StatusBlock,
} from '../../../Common'
import { SeasonList } from '../components/SeasonList'
import { useTVShowDetailController } from '../controllers/useTVShowDetailController'

export const TVShowDetailPage = observer(() => {
  const { showId } = useParams()
  const id = Number(showId)
  const { show, showStatus, notFound } = useTVShowDetailController(id)

  if (notFound) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold">TV show not found</h1>
        <p className="mt-2 text-neutral-500">
          The show you are looking for does not exist.
        </p>
      </main>
    )
  }

  return (
    <main>
      <SectionErrorBoundary title="TV show details failed to load.">
        <StatusBlock status={showStatus} isEmpty={!show}>
          {show && (
            <>
              {getBackdropUrl(show.backdrop_path) ? (
                <img
                  src={getBackdropUrl(show.backdrop_path)!}
                  alt={show.name}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <NullImage className="h-64 w-full" label="No backdrop" />
              )}

              <div className="flex gap-6 p-6">
                {getPosterUrl(show.poster_path) ? (
                  <img
                    src={getPosterUrl(show.poster_path)!}
                    alt={show.name}
                    className="h-64 w-44 rounded-md object-cover"
                  />
                ) : (
                  <NullImage className="h-64 w-44 rounded-md" label="No poster" />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{show.name}</h1>
                  <p className="mt-2 text-sm text-neutral-600">
                    {show.first_air_date} · {show.number_of_seasons} seasons · ★{' '}
                    {show.vote_average.toFixed(1)}
                  </p>
                  <p className="mt-2 text-sm">
                    {show.genres.map((g) => g.name).join(', ')}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed">
                    {show.overview}
                  </p>
                </div>
              </div>

              <SeasonList seasons={show.seasons} />
            </>
          )}
        </StatusBlock>
      </SectionErrorBoundary>

      <div className="px-6 pb-8">
        <Outlet />
      </div>
    </main>
  )
})