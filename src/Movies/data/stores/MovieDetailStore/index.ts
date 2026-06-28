import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import type { CastMember, MovieDetail, MovieListItem, Video } from '../../../../Common/core/types/Tmdb.types'
import type { TmdbService } from '../../../../Common/data/services/TmdbService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export class MovieDetailStore {
  movie: MovieDetail | null = null
  videos: Video[] = []
  cast: CastMember[] = []
  similar: MovieListItem[] = []
  recommended: MovieListItem[] = []
  notFound = false

  movieStatus: Status = 'idle'
  videosStatus: Status = 'idle'
  castStatus: Status = 'idle'
  similarStatus: Status = 'idle'
  recommendedStatus: Status = 'idle'

  constructor(private tmdbService: TmdbService) {
    makeAutoObservable(this)
  }

  async fetchMovieDetail(movieId: number) {
    this.reset()
    await Promise.all([
      this.fetchMovie(movieId),
      this.fetchVideos(movieId),
      this.fetchCast(movieId),
      this.fetchSimilar(movieId),
      this.fetchRecommended(movieId),
    ])
  }

  private reset() {
    this.notFound = false
    this.movie = null
    this.videos = []
    this.cast = []
    this.similar = []
    this.recommended = []
  }

  private async fetchMovie(id: number) {
    this.movieStatus = 'loading'
    try {
      const movie = await this.tmdbService.getMovieDetails(id)
      runInAction(() => { this.movie = movie; this.movieStatus = 'success' })
    } catch (error) {
      runInAction(() => {
        this.movieStatus = 'error'
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          this.notFound = true
        }
      })
    }
  }

  private async fetchVideos(id: number) {
    this.videosStatus = 'loading'
    try {
      const videos = await this.tmdbService.getMovieVideos(id)
      runInAction(() => { this.videos = videos; this.videosStatus = 'success' })
    } catch {
      runInAction(() => { this.videosStatus = 'error' })
    }
  }

  private async fetchCast(id: number) {
    this.castStatus = 'loading'
    try {
      const cast = await this.tmdbService.getMovieCredits(id)
      runInAction(() => { this.cast = cast; this.castStatus = 'success' })
    } catch {
      runInAction(() => { this.castStatus = 'error' })
    }
  }

  private async fetchSimilar(id: number) {
    this.similarStatus = 'loading'
    try {
      const similar = await this.tmdbService.getSimilarMovies(id)
      runInAction(() => { this.similar = similar; this.similarStatus = 'success' })
    } catch {
      runInAction(() => { this.similarStatus = 'error' })
    }
  }

  private async fetchRecommended(id: number) {
    this.recommendedStatus = 'loading'
    try {
      const recommended = await this.tmdbService.getRecommendedMovies(id)
      runInAction(() => { this.recommended = recommended; this.recommendedStatus = 'success' })
    } catch {
      runInAction(() => { this.recommendedStatus = 'error' })
    }
  }

  get trailerVideo() {
    return this.videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
      ?? this.videos.find((v) => v.site === 'YouTube')
      ?? null
  }
}