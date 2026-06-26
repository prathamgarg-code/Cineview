import { createBrowserRouter } from 'react-router-dom'
import { GuestRoute, LoginPage, ProtectedRoute } from './Auth'
import { HomePage, MovieDetailPage } from './Movies'
import { TVShowDetailPage, SeasonDetailPage } from './TVShows'
import { SearchPage } from './Search'
import { WatchlistPage, CollectionsPage, ListDetailPage } from './Collection'
import { SettingsPage } from './Preferences'
import { NotFoundPage } from './Common'

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetailPage />,
      },
      {
        path: '/tv/:showId',
        element: <TVShowDetailPage />,
        children: [
          {
            path: 'season/:seasonNumber',
            element: <SeasonDetailPage />,
          },
        ],
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/lists',
        element: <CollectionsPage />,
      },
      {
        path: '/lists/:listId',
        element: <ListDetailPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])