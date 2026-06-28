import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { SectionErrorBoundary, StatusBlock } from '../../../Common'
import { EpisodeList } from '../components/EpisodeList'
import { useSeasonDetailController } from '../controllers/useSeasonDetailController'

export const SeasonDetailPage = observer(() => {
  const { showId, seasonNumber } = useParams()
  const id = Number(showId)
  const season = Number(seasonNumber)
  const { season: seasonData, seasonStatus } = useSeasonDetailController(id, season)

  return (
    <section className="mt-6 rounded border border-neutral-200 p-4">
      <SectionErrorBoundary title="Season failed to load.">
        <StatusBlock status={seasonStatus} isEmpty={!seasonData}>
          {seasonData && (
            <>
              <h2 className="text-xl font-semibold">{seasonData.name}</h2>
              <p className="mb-4 mt-2 text-sm text-neutral-600">
                {seasonData.overview}
              </p>
              <EpisodeList episodes={seasonData.episodes} />
            </>
          )}
        </StatusBlock>
      </SectionErrorBoundary>
    </section>
  )
})