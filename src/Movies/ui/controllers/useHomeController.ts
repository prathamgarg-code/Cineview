import { useEffect } from 'react'
import { useMoviesStores } from '../../data/stores/providers'

export const useHomeController = () => {
  const { homeStore } = useMoviesStores()

  useEffect(() => {
    homeStore.fetchHomeData()
  }, [homeStore])

  return {
    heroMovie: homeStore.heroMovie,
    heroStatus: homeStore.heroStatus,
    genres: homeStore.genres,
    genresStatus: homeStore.genresStatus,
    selectedGenreId: homeStore.selectedGenreId,
    setSelectedGenre: (id: number | null) => homeStore.setSelectedGenre(id),
    rows: [
      {
        key: 'trending',
        title: 'Trending',
        items: homeStore.filteredTrending,
        status: homeStore.trendingStatus,
      },
      {
        key: 'popular',
        title: 'Popular',
        items: homeStore.filteredPopular,
        status: homeStore.popularStatus,
      },
      {
        key: 'topRated',
        title: 'Top Rated',
        items: homeStore.filteredTopRated,
        status: homeStore.topRatedStatus,
      },
      {
        key: 'upcoming',
        title: 'Upcoming',
        items: homeStore.filteredUpcoming,
        status: homeStore.upcomingStatus,
      },
    ],
  }
}