import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { TmdbAPI, tmdbApiClient } from '../../../Common'
import { SeasonDetailStore } from './SeasonDetailStore'
import { TVShowDetailStore } from './TVShowDetailStore'

interface TVShowsStores {
  tvShowDetailStore: TVShowDetailStore
  seasonDetailStore: SeasonDetailStore
}

const TVShowsStoreContext = createContext<TVShowsStores | null>(null)

export const TVShowsStoreProvider = ({ children }: { children: ReactNode }) => {
  const stores = useMemo(() => {
    const tmdbService = new TmdbAPI(tmdbApiClient)
    return {
      tvShowDetailStore: new TVShowDetailStore(tmdbService),
      seasonDetailStore: new SeasonDetailStore(tmdbService),
    }
  }, [])

  return (
    <TVShowsStoreContext.Provider value={stores}>
      {children}
    </TVShowsStoreContext.Provider>
  )
}

export const useTVShowsStores = () => {
  const ctx = useContext(TVShowsStoreContext)
  if (!ctx) throw new Error('useTVShowsStores must be used within TVShowsStoreProvider')
  return ctx
}