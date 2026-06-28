import { getProfileUrl, NullImage } from '../../../../Common'
import type { MultiSearchItem } from '../../../../Common/core/types/Tmdb.types'

interface PersonCardProps {
  item: MultiSearchItem
}

export const PersonCard = ({ item }: PersonCardProps) => {
  const profileUrl = getProfileUrl(item.profile_path ?? null)
  const name = item.name ?? 'Unknown'

  return (
    <article className="w-28 shrink-0 text-center">
      {profileUrl ? (
        <img
          src={profileUrl}
          alt={name}
          className="mx-auto h-28 w-28 rounded-full object-cover"
        />
      ) : (
        <NullImage className="mx-auto h-28 w-28 rounded-full" label="No photo" />
      )}
      <p className="mt-2 text-sm font-medium">{name}</p>
      <p className="text-xs text-neutral-500">{item.known_for_department}</p>
    </article>
  )
}