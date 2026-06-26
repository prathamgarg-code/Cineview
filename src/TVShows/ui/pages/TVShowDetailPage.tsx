import { Outlet, useParams } from 'react-router-dom'

export const TVShowDetailPage = () => {
  const { showId } = useParams()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">TV Show Detail</h1>
      <p className="mt-2 text-neutral-500">Show ID: {showId}</p>
      <Outlet />
    </main>
  )
}