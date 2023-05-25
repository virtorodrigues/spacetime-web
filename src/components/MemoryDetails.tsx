import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface MemoryDetailProps {
  id: string
}

export async function MemoryDetail({ id }: MemoryDetailProps) {
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <Image
        className="aspect-video w-full rounded-lg object-cover"
        src={data.coverUrl}
        alt=""
        width={700}
        height={280}
      />

      <span>{data.content}</span>

      <time>{data.createdAt}</time>
    </div>
  )
}
