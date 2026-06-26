import { HARDCODED_CREDENTIALS } from '../../../core/constants/Auth.constants'
import type { LoginFormValues } from '../../../core/types/Auth.types'
import type { AuthService } from './index'

export class LocalAuthService implements AuthService {
  async verifyCredentials(credentials: LoginFormValues): Promise<boolean> {
    return (
      credentials.email === HARDCODED_CREDENTIALS.email &&
      credentials.password === HARDCODED_CREDENTIALS.password
    )
  }
}