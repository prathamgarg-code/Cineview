import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginFormSchema } from '../../core/types/index.zod'
import type { LoginFormValues } from '../../core/types/Auth.types'
import { useAuthStore } from '../../data/stores/providers'

export const useLoginController = () => {
  const store = useAuthStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginFormValues, string>>
  >({})

  const submitLogin = async (values: LoginFormValues) => {
    const result = loginFormSchema.safeParse(values)

    if (!result.success) {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginFormValues
        if (!errors[field]) {
          errors[field] = issue.message
        }
      }
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    const success = await store.login(result.data)

    if (success) {
      const redirectTo = searchParams.get('redirect') || '/'
      navigate(redirectTo, { replace: true })
    }
  }

  return {
    fieldErrors,
    loginError: store.loginError,
    loginStatus: store.loginStatus,
    submitLogin,
  }
}