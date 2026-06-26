import { useNavigate } from 'react-router-dom'
import { LOGIN_PATH } from '../../core/constants/Auth.constants'
import { useAuthStore } from '../../data/stores/providers'

export const useAuthController = () => {
  const store = useAuthStore()
  const navigate = useNavigate()

  return {
    isAuthenticated: store.isAuthenticated,
    username: store.username,
    loginError: store.loginError,
    loginStatus: store.loginStatus,
    logout: () => {
      store.logout()
      navigate(LOGIN_PATH, { replace: true })
    },
  }
}