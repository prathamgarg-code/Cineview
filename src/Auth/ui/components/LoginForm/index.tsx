import { useState, type FormEvent } from 'react'
import type { LoginFormValues } from '../../../core/types/Auth.types'

interface LoginFormProps {
  fieldErrors: Partial<Record<keyof LoginFormValues, string>>
  loginError: string | null
  loginStatus: 'idle' | 'loading' | 'success' | 'error'
  onSubmit: (values: LoginFormValues) => void
}

export const LoginForm = ({
  fieldErrors,
  loginError,
  loginStatus,
  onSubmit,
}: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ email, password })
  }

  const isLoading = loginStatus === 'loading'

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm"
      noValidate
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900">CineView</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in to continue</p>
      </div>

      {loginError && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {loginError}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          placeholder="name@example.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-16 text-sm outline-none focus:border-neutral-500"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}