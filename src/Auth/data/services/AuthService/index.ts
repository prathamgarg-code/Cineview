import type { LoginFormValues } from '../../../core/types/Auth.types'

export interface AuthService {
  verifyCredentials(credentials: LoginFormValues): Promise<boolean>
}