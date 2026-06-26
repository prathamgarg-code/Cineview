import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    type ReactNode,
  } from 'react'
  import { LocalAuthService } from '../services/AuthService/index.local'
  import { AuthStore } from './AuthStore'
  
  const AuthStoreContext = createContext<AuthStore | null>(null)
  
  export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
    const store = useMemo(() => new AuthStore(new LocalAuthService()), [])
  
    useEffect(() => {
      store.initializeSession()
    }, [store])
  
    return (
      <AuthStoreContext.Provider value={store}>
        {children}
      </AuthStoreContext.Provider>
    )
  }
  
  export const useAuthStore = (): AuthStore => {
    const store = useContext(AuthStoreContext)
    if (!store) {
      throw new Error('useAuthStore must be used within AuthStoreProvider')
    }
    return store
  }