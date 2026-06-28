import type { AxiosInstance } from 'axios'
import {
  creditsResponseSchema,
  genreListResponseSchema,
  movieDetailSchema,
  movieListItemSchema,
  multiSearchResponseSchema,
  paginatedSchema,
  seasonDetailSchema,
  tvDetailSchema,
  videosResponseSchema,
} from '../../../core/types/index.zod'
import type { TmdbService } from './index'

export class TmdbAPI implements TmdbService {
  constructor(private client: AxiosInstance) {}

  private async getList(url: string) {
    const response = await this.client.get(url)
    return paginatedSchema(movieListItemSchema).parse(response.data).results
  }

  getTrendingMovies() {
    return this.getList('/trending/movie/day')
  }

  getPopularMovies() {
    return this.getList('/movie/popular')
  }

  getTopRatedMovies() {
    return this.getList('/movie/top_rated')
  }

  getUpcomingMovies() {
    return this.getList('/movie/upcoming')
  }

  async getMovieGenres() {
    const response = await this.client.get('/genre/movie/list')
    return genreListResponseSchema.parse(response.data).genres
  }

  async getMovieDetails(id: number) {
    const response = await this.client.get(`/movie/${id}`)
    return movieDetailSchema.parse(response.data)
  }

  async getMovieVideos(id: number) {
    const response = await this.client.get(`/movie/${id}/videos`)
    return videosResponseSchema.parse(response.data).results
  }

  async getMovieCredits(id: number) {
    const response = await this.client.get(`/movie/${id}/credits`)
    return creditsResponseSchema.parse(response.data).cast
  }

  getSimilarMovies(id: number) {
    return this.getList(`/movie/${id}/similar`)
  }

  getRecommendedMovies(id: number) {
    return this.getList(`/movie/${id}/recommendations`)
  }

  async searchMulti(query: string) {
    const response = await this.client.get('/search/multi', {
      params: { query, include_adult: false },
    })
    return multiSearchResponseSchema.parse(response.data).results
  }

  async getTVShowDetails(id: number) {
    const response = await this.client.get(`/tv/${id}`)
    return tvDetailSchema.parse(response.data)
  }

  async getTVSeasonDetails(showId: number, seasonNumber: number) {
    const response = await this.client.get(`/tv/${showId}/season/${seasonNumber}`)
    return seasonDetailSchema.parse(response.data)
  }
}