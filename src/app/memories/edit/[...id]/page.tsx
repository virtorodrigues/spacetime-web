import { NewMemoryForm } from '@/components/NewMemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface EditMemoryPageProps {
  params: {
    id: string[]
  }
}

export default async function EditMemoryPage({ params }: EditMemoryPageProps) {
  const id = params.id[0]
  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const memory = (await response.data) || undefined

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm memory={memory} />
    </div>
  )
}
