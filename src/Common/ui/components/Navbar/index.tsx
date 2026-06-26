import { useState, type FormEvent, type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../../core/constants/Routes.constants'

interface NavbarProps {
  username: string
  onLogout: () => void
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-neutral-900 text-white'
      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
  ].join(' ')

export const Navbar = ({ username, onLogout }: NavbarProps) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (!query) {
      navigate('/search')
      return
    }
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const initials = username
    .split('@')[0]
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
        <NavLink to="/" className="text-lg font-bold text-neutral-900">
          CineView
        </NavLink>

        <nav className="flex flex-wrap items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearchSubmit} className="ml-auto flex min-w-[200px] flex-1 max-w-md">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, TV shows…"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
        </form>

        <button
          type="button"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-700"
          aria-label="Language switcher placeholder"
        >
          EN
        </button>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white"
          title={username}
          aria-label={`Signed in as ${username}`}
        >
          {initials}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

interface AppShellProps {
  username: string
  onLogout: () => void
  children: ReactNode
}

export const AppShell = ({ username, onLogout, children }: AppShellProps) => (
  <div className="min-h-screen bg-neutral-50">
    <Navbar username={username} onLogout={onLogout} />
    <div className="mx-auto max-w-7xl">{children}</div>
  </div>
)