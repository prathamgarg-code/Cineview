import { makeAutoObservable, runInAction } from 'mobx'
import type { MultiSearchItem } from '../../../../Common/core/types/Tmdb.types'
import { recentSearchesSchema } from '../../../../Common/core/types/index.zod'
import type { TmdbService } from '../../../../Common/data/services/TmdbService'

const RECENT_SEARCHES_KEY = 'cineview_recent_searches'
type Status = 'idle' | 'loading' | 'success' | 'error'

export class SearchStore {
  query = ''
  results: MultiSearchItem[] = []
  searchStatus: Status = 'idle'
  recentSearches: string[] = []

  constructor(private tmdbService: TmdbService) {
    makeAutoObservable(this)
    this.loadRecentSearches()
  }

  get movies() {
    return this.results.filter((r) => r.media_type === 'movie')
  }

  get tvShows() {
    return this.results.filter((r) => r.media_type === 'tv')
  }

  get people() {
    return this.results.filter((r) => r.media_type === 'person')
  }

  setQuery(query: string) {
    this.query = query
  }

  private loadRecentSearches() {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (!raw) return
      this.recentSearches = recentSearchesSchema.parse(JSON.parse(raw))
    } catch {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    }
  }

  addRecentSearch(query: string) {
    const trimmed = query.trim()
    if (!trimmed) return
    const updated = [
      trimmed,
      ...this.recentSearches.filter((q) => q !== trimmed),
    ].slice(0, 10)
    this.recentSearches = updated
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }

  async search(query: string) {
    const trimmed = query.trim()
    if (!trimmed) {
      this.results = []
      this.searchStatus = 'idle'
      return
    }

    this.searchStatus = 'loading'
    try {
      const results = await this.tmdbService.searchMulti(trimmed)
      runInAction(() => {
        this.results = results
        this.searchStatus = 'success'
      })
      this.addRecentSearch(trimmed)
    } catch {
      runInAction(() => {
        this.searchStatus = 'error'
      })
    }
  }
}