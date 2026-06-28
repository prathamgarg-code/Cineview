import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { TmdbAPI, tmdbApiClient } from '../../../Common'
import { HomeStore } from './HomeStore'
import { MovieDetailStore } from './MovieDetailStore'

interface MoviesStores {
  homeStore: HomeStore
  movieDetailStore: MovieDetailStore
}

const MoviesStoreContext = createContext<MoviesStores | null>(null)

export const MoviesStoreProvider = ({ children }: { children: ReactNode }) => {
  const stores = useMemo(() => {
    const tmdbService = new TmdbAPI(tmdbApiClient)
    return {
      homeStore: new HomeStore(tmdbService),
      movieDetailStore: new MovieDetailStore(tmdbService),
    }
  }, [])

  return (
    <MoviesStoreContext.Provider value={stores}>
      {children}
    </MoviesStoreContext.Provider>
  )
}

export const useMoviesStores = () => {
  const ctx = useContext(MoviesStoreContext)
  if (!ctx) throw new Error('useMoviesStores must be used within MoviesStoreProvider')
  return ctx
}