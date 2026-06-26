import { useParams } from 'react-router-dom'

export const SeasonDetailPage = () => {
  const { showId, seasonNumber } = useParams()

  return (
    <section className="mt-6 rounded border border-neutral-200 p-4">
      <h2 className="text-xl font-semibold">Season Detail</h2>
      <p className="mt-2 text-neutral-500">
        Show ID: {showId} · Season: {seasonNumber}
      </p>
    </section>
  )
}