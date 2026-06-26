import { makeAutoObservable, runInAction } from 'mobx'
import {
  AUTH_SESSION_KEY,
} from '../../../core/constants/Auth.constants'
import { sessionDataSchema } from '../../../core/types/index.zod'
import type { LoginFormValues, SessionData } from '../../../core/types/Auth.types'
import type { AuthService } from '../../services/AuthService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export class AuthStore {
  isAuthenticated = false
  username: string | null = null
  loginStatus: Status = 'idle'
  loginError: string | null = null

  constructor(private authService: AuthService) {
    makeAutoObservable(this)
    this.initializeSession()
  }

  initializeSession(): void {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY)
    if (!raw) return

    try {
      const parsed = sessionDataSchema.parse(JSON.parse(raw)) as SessionData
      this.isAuthenticated = true
      this.username = parsed.username
    } catch {
      sessionStorage.removeItem(AUTH_SESSION_KEY)
    }
  }

  async login(credentials: LoginFormValues): Promise<boolean> {
    this.loginStatus = 'loading'
    this.loginError = null

    try {
      const isValid = await this.authService.verifyCredentials(credentials)

      if (!isValid) {
        runInAction(() => {
          this.loginStatus = 'error'
          this.loginError = 'Invalid email or password. Please try again.'
        })
        return false
      }

      const session: SessionData = { username: credentials.email }
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))

      runInAction(() => {
        this.isAuthenticated = true
        this.username = credentials.email
        this.loginStatus = 'success'
        this.loginError = null
      })

      return true
    } catch {
      runInAction(() => {
        this.loginStatus = 'error'
        this.loginError = 'Something went wrong. Please try again.'
      })
      return false
    }
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_SESSION_KEY)
    this.isAuthenticated = false
    this.username = null
    this.loginStatus = 'idle'
    this.loginError = null
  }
}