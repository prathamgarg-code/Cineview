import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { TmdbAPI, tmdbApiClient } from '../../../Common'
import { SearchStore } from './SearchStore'

const SearchStoreContext = createContext<SearchStore | null>(null)

export const SearchStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useMemo(() => new SearchStore(new TmdbAPI(tmdbApiClient)), [])

  return (
    <SearchStoreContext.Provider value={store}>
      {children}
    </SearchStoreContext.Provider>
  )
}

export const useSearchStore = () => {
  const store = useContext(SearchStoreContext)
  if (!store) throw new Error('useSearchStore must be used within SearchStoreProvider')
  return store
}