import type { ReactNode } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface StatusBlockProps {
  status: Status
  isEmpty?: boolean
  errorMessage?: string
  emptyMessage?: string
  children: ReactNode
}

export const StatusBlock = ({
  status,
  isEmpty = false,
  errorMessage = 'Something went wrong.',
  emptyMessage = 'No results found.',
  children,
}: StatusBlockProps) => {
  if (status === 'loading' || status === 'idle') {
    return <p className="py-8 text-center text-neutral-500">Loading…</p>
  }

  if (status === 'error') {
    return <p className="py-8 text-center text-red-600">{errorMessage}</p>
  }

  if (isEmpty) {
    return <p className="py-8 text-center text-neutral-500">{emptyMessage}</p>
  }

  return <>{children}</>
}