import type { ReactNode } from 'react'

interface ContentRowProps {
  title: string
  children: ReactNode
}

export const ContentRow = ({ title, children }: ContentRowProps) => (
  <section className="mb-8">
    <h2 className="mb-3 px-4 text-lg font-semibold">{title}</h2>
    <div className="flex gap-4 overflow-x-auto px-4 pb-2">{children}</div>
  </section>
)