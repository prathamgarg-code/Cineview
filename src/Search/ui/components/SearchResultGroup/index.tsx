import type { ReactNode } from 'react'
import { ContentRow } from '../../../../Common'

interface SearchResultGroupProps {
  title: string
  isEmpty: boolean
  children: ReactNode
}

export const SearchResultGroup = ({
  title,
  isEmpty,
  children,
}: SearchResultGroupProps) => {
  if (isEmpty) return null
  return <ContentRow title={title}>{children}</ContentRow>
}