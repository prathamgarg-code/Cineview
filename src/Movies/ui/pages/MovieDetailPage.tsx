import { useParams } from 'react-router-dom'

export const MovieDetailPage = () => {
  const { movieId } = useParams()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Movie Detail</h1>
      <p className="mt-2 text-neutral-500">Movie ID: {movieId}</p>
    </main>
  )
}