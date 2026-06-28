import type {
    CastMember,
    MovieDetail,
    MovieListItem,
    MultiSearchItem,
    SeasonDetail,
    TVDetail,
    Video,
  } from '../../../core/types/Tmdb.types'
  import type { Genre } from '../../../core/types/Tmdb.types'
  
  export interface TmdbService {
    getTrendingMovies(): Promise<MovieListItem[]>
    getPopularMovies(): Promise<MovieListItem[]>
    getTopRatedMovies(): Promise<MovieListItem[]>
    getUpcomingMovies(): Promise<MovieListItem[]>
    getMovieGenres(): Promise<Genre[]>
    getMovieDetails(id: number): Promise<MovieDetail>
    getMovieVideos(id: number): Promise<Video[]>
    getMovieCredits(id: number): Promise<CastMember[]>
    getSimilarMovies(id: number): Promise<MovieListItem[]>
    getRecommendedMovies(id: number): Promise<MovieListItem[]>
    searchMulti(query: string): Promise<MultiSearchItem[]>
    getTVShowDetails(id: number): Promise<TVDetail>
    getTVSeasonDetails(showId: number, seasonNumber: number): Promise<SeasonDetail>
  }