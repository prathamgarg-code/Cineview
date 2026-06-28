import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchStore } from '../../data/stores/providers'

export const useSearchController = () => {
  const store = useSearchStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  const [inputValue, setInputValue] = useState(urlQuery)

  useEffect(() => {
    setInputValue(urlQuery)
    store.setQuery(urlQuery)
  }, [urlQuery, store])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const trimmed = inputValue.trim()
      if (trimmed !== urlQuery) {
        setSearchParams(trimmed ? { q: trimmed } : {})
        return
      }
      store.search(trimmed)
    }, 400)

    return () => window.clearTimeout(timer)
  }, [inputValue, urlQuery, setSearchParams, store])

  return {
    inputValue,
    setInputValue,
    searchStatus: store.searchStatus,
    movies: store.movies,
    tvShows: store.tvShows,
    people: store.people,
    recentSearches: store.recentSearches,
    searchFromRecent: (query: string) => {
      setInputValue(query)
      setSearchParams({ q: query })
    },
  }
}