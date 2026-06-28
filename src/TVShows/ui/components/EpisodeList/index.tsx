import type { Episode } from '../../../../Common/core/types/Tmdb.types'

interface EpisodeListProps {
  episodes: Episode[]
}

export const EpisodeList = ({ episodes }: EpisodeListProps) => (
  <div className="space-y-3">
    {episodes.map((episode) => (
      <article
        key={episode.id}
        className="flex gap-3 rounded-md border border-neutral-200 p-4"
      >
        <input
          type="checkbox"
          disabled
          aria-label={`Mark episode ${episode.episode_number} as watched (coming soon)`}
          className="mt-1"
        />
        <div>
          <h3 className="font-medium">
            {episode.episode_number}. {episode.name}
          </h3>
          <p className="text-sm text-neutral-500">
            {episode.air_date ?? 'TBA'}
          </p>
          <p className="mt-1 text-sm text-neutral-700">{episode.overview}</p>
        </div>
      </article>
    ))}
  </div>
)