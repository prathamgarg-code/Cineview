import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthController } from '../../controllers/useAuthController'

export const GuestRoute = observer(() => {
  const { isAuthenticated } = useAuthController()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
})