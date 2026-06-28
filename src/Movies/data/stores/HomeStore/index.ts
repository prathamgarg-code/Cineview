import { makeAutoObservable, runInAction } from 'mobx'
import type { Genre, MovieListItem } from '../../../../Common/core/types/Tmdb.types'
import type { TmdbService } from '../../../../Common/data/services/TmdbService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export class HomeStore {
  heroMovie: MovieListItem | null = null
  trending: MovieListItem[] = []
  popular: MovieListItem[] = []
  topRated: MovieListItem[] = []
  upcoming: MovieListItem[] = []
  genres: Genre[] = []
  selectedGenreId: number | null = null

  heroStatus: Status = 'idle'
  trendingStatus: Status = 'idle'
  popularStatus: Status = 'idle'
  topRatedStatus: Status = 'idle'
  upcomingStatus: Status = 'idle'
  genresStatus: Status = 'idle'

  constructor(private tmdbService: TmdbService) {
    makeAutoObservable(this)
  }

  setSelectedGenre(genreId: number | null) {
    this.selectedGenreId = genreId
  }

  private filterByGenre(movies: MovieListItem[]) {
    if (!this.selectedGenreId) return movies
    return movies.filter((m) => m.genre_ids?.includes(this.selectedGenreId!))
  }

  get filteredTrending() { return this.filterByGenre(this.trending) }
  get filteredPopular() { return this.filterByGenre(this.popular) }
  get filteredTopRated() { return this.filterByGenre(this.topRated) }
  get filteredUpcoming() { return this.filterByGenre(this.upcoming) }

  async fetchHomeData() {
    await Promise.all([
      this.fetchHero(),
      this.fetchRow('trending'),
      this.fetchRow('popular'),
      this.fetchRow('topRated'),
      this.fetchRow('upcoming'),
      this.fetchGenres(),
    ])
  }

  private async fetchHero() {
    this.heroStatus = 'loading'
    try {
      const movies = await this.tmdbService.getTrendingMovies()
      runInAction(() => {
        this.heroMovie = movies[0] ?? null
        this.heroStatus = 'success'
      })
    } catch {
      runInAction(() => { this.heroStatus = 'error' })
    }
  }

  private async fetchRow(
    key: 'trending' | 'popular' | 'topRated' | 'upcoming',
  ) {
    const statusKey = `${key}Status` as const
    this[`${key}Status`] = 'loading'
    try {
      const fetchers = {
        trending: () => this.tmdbService.getTrendingMovies(),
        popular: () => this.tmdbService.getPopularMovies(),
        topRated: () => this.tmdbService.getTopRatedMovies(),
        upcoming: () => this.tmdbService.getUpcomingMovies(),
      }
      const data = await fetchers[key]()
      runInAction(() => {
        this[key] = data
        this[statusKey] = 'success'
      })
    } catch {
      runInAction(() => { this[statusKey] = 'error' })
    }
  }

  private async fetchGenres() {
    this.genresStatus = 'loading'
    try {
      const genres = await this.tmdbService.getMovieGenres()
      runInAction(() => {
        this.genres = genres
        this.genresStatus = 'success'
      })
    } catch {
      runInAction(() => { this.genresStatus = 'error' })
    }
  }
}