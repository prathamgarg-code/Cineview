import { useEffect } from 'react'
import { useTVShowsStores } from '../../data/stores/providers'

export const useTVShowDetailController = (showId: number) => {
  const { tvShowDetailStore } = useTVShowsStores()

  useEffect(() => {
    if (!Number.isNaN(showId)) {
      tvShowDetailStore.fetchShow(showId)
    }
  }, [tvShowDetailStore, showId])

  return {
    show: tvShowDetailStore.show,
    showStatus: tvShowDetailStore.showStatus,
    notFound: tvShowDetailStore.notFound,
  }
}