import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  it('renders a 404 message', () => {
    render(<NotFoundPage />)
    expect(screen.getByText(/404 — Page Not Found/i)).toBeInTheDocument()
  })
})