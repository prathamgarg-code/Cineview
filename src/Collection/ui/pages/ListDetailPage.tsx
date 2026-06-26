import { useParams } from 'react-router-dom'

export const ListDetailPage = () => {
  const { listId } = useParams()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">List Detail</h1>
      <p className="mt-2 text-neutral-500">List ID: {listId}</p>
    </main>
  )
}