import { Link } from 'react-router-dom'
import { getPosterUrl, NullImage } from '../../../../Common'
import type { MultiSearchItem } from '../../../../Common/core/types/Tmdb.types'

interface TVCardProps {
  item: MultiSearchItem
}

export const TVCard = ({ item }: TVCardProps) => {
  const posterUrl = getPosterUrl(item.poster_path ?? null)
  const title = item.name ?? 'Unknown'

  return (
    <Link to={`/tv/${item.id}`} className="w-36 shrink-0">
      {posterUrl ? (
        <img src={posterUrl} alt={title} className="h-52 w-full rounded-md object-cover" />
      ) : (
        <NullImage className="h-52 w-full rounded-md" label="No poster" />
      )}
      <h3 className="mt-2 line-clamp-2 text-sm font-medium">{title}</h3>
    </Link>
  )
}