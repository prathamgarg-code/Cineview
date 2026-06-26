import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthStoreProvider } from './Auth'
import './index.css'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthStoreProvider>
      <RouterProvider router={router} />
    </AuthStoreProvider>
  </StrictMode>,
)