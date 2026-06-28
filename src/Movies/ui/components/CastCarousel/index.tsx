import { getProfileUrl, NullImage } from '../../../../Common'
import type { CastMember } from '../../../../Common/core/types/Tmdb.types'

interface CastCarouselProps {
  cast: CastMember[]
}

export const CastCarousel = ({ cast }: CastCarouselProps) => (
  <div className="flex gap-4 overflow-x-auto px-4 pb-2">
    {cast.slice(0, 15).map((member) => {
      const profileUrl = getProfileUrl(member.profile_path)
      return (
        <article key={member.id} className="w-28 shrink-0 text-center">
          {profileUrl ? (
            <img
              src={profileUrl}
              alt={member.name}
              className="mx-auto h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <NullImage className="mx-auto h-28 w-28 rounded-full" label="No photo" />
          )}
          <p className="mt-2 text-sm font-medium">{member.name}</p>
          <p className="text-xs text-neutral-500">{member.character}</p>
        </article>
      )
    })}
  </div>
)