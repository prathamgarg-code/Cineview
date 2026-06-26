import { observer } from 'mobx-react-lite'
import { LoginForm } from '../components/LoginForm'
import { useLoginController } from '../controllers/useLoginController'

export const LoginPage = observer(() => {
  const { fieldErrors, loginError, loginStatus, submitLogin } =
    useLoginController()

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <LoginForm
        fieldErrors={fieldErrors}
        loginError={loginError}
        loginStatus={loginStatus}
        onSubmit={submitLogin}
      />
    </main>
  )
})