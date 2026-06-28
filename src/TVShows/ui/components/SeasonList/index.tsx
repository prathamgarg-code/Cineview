import { Link, useParams } from 'react-router-dom'
import type { TVDetail } from '../../../../Common/core/types/Tmdb.types'

interface SeasonListProps {
  seasons: TVDetail['seasons']
}

export const SeasonList = ({ seasons }: SeasonListProps) => {
  const { showId } = useParams()

  return (
    <section className="px-6">
      <h2 className="mb-3 text-lg font-semibold">Seasons</h2>
      <div className="space-y-2">
        {seasons
          .filter((season) => season.season_number > 0)
          .map((season) => (
            <Link
              key={season.id}
              to={`/tv/${showId}/season/${season.season_number}`}
              className="block rounded-md border border-neutral-200 px-4 py-3 hover:bg-neutral-50"
            >
              <p className="font-medium">{season.name}</p>
              <p className="text-sm text-neutral-500">
                {season.episode_count} episodes
                {season.air_date ? ` · ${season.air_date}` : ''}
              </p>
            </Link>
          ))}
      </div>
    </section>
  )
}