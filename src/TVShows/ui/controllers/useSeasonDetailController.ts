import { useEffect } from 'react'
import { useTVShowsStores } from '../../data/stores/providers'

export const useSeasonDetailController = (
  showId: number,
  seasonNumber: number,
) => {
  const { seasonDetailStore } = useTVShowsStores()

  useEffect(() => {
    if (!Number.isNaN(showId) && !Number.isNaN(seasonNumber)) {
      seasonDetailStore.fetchSeason(showId, seasonNumber)
    }
  }, [seasonDetailStore, showId, seasonNumber])

  return {
    season: seasonDetailStore.season,
    seasonStatus: seasonDetailStore.seasonStatus,
  }
}