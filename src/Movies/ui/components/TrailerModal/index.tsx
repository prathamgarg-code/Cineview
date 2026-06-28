import { Modal } from '../../../../Common'
import type { Video } from '../../../../Common/core/types/Tmdb.types'

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  video: Video | null
}

export const TrailerModal = ({ isOpen, onClose, video }: TrailerModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title={video?.name ?? 'Trailer'}>
    {video ? (
      <div className="aspect-video w-full">
        <iframe
          title={video.name}
          src={`https://www.youtube.com/embed/${video.key}`}
          className="h-full w-full rounded-md"
          allowFullScreen
        />
      </div>
    ) : (
      <p className="text-sm text-neutral-500">No trailer available.</p>
    )}
  </Modal>
)