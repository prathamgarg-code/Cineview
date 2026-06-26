import { observer } from 'mobx-react-lite'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AppShell } from '../../../../Common/ui/components/Navbar'
import { LOGIN_PATH } from '../../../core/constants/Auth.constants'
import { useAuthController } from '../../controllers/useAuthController'

export const ProtectedRoute = observer(() => {
  const { isAuthenticated, username, logout } = useAuthController()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(
      `${location.pathname}${location.search}`,
    )
    return <Navigate to={`${LOGIN_PATH}?redirect=${redirect}`} replace />
  }

  return (
    <AppShell username={username ?? 'User'} onLogout={logout}>
      <Outlet />
    </AppShell>
  )
})