import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMoviesStores } from '../../data/stores/providers'

export const useMovieDetailController = (movieId: number) => {
  const { movieDetailStore } = useMoviesStores()
  const [searchParams, setSearchParams] = useSearchParams()

  const isTrailerOpen = searchParams.get('trailer') === '1'

  useEffect(() => {
    if (!Number.isNaN(movieId)) {
      movieDetailStore.fetchMovieDetail(movieId)
    }
  }, [movieDetailStore, movieId])

  const openTrailer = () => setSearchParams({ trailer: '1' })
  const closeTrailer = () => setSearchParams({})

  return {
    movie: movieDetailStore.movie,
    movieStatus: movieDetailStore.movieStatus,
    cast: movieDetailStore.cast,
    castStatus: movieDetailStore.castStatus,
    similar: movieDetailStore.similar,
    similarStatus: movieDetailStore.similarStatus,
    recommended: movieDetailStore.recommended,
    recommendedStatus: movieDetailStore.recommendedStatus,
    notFound: movieDetailStore.notFound,
    trailerVideo: movieDetailStore.trailerVideo,
    isTrailerOpen,
    openTrailer,
    closeTrailer,
  }
}