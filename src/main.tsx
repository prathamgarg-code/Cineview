import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthStoreProvider } from './Auth'
import { MoviesStoreProvider } from './Movies'
import { SearchStoreProvider } from './Search'
import { TVShowsStoreProvider } from './TVShows'
import './index.css'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthStoreProvider>
      <MoviesStoreProvider>
        <SearchStoreProvider>
          <TVShowsStoreProvider>
            <RouterProvider router={router} />
          </TVShowsStoreProvider>
        </SearchStoreProvider>
      </MoviesStoreProvider>
    </AuthStoreProvider>
  </StrictMode>,
)