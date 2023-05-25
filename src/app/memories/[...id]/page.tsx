import { EditMemoryButton } from '@/components/EditMemoryButton'
import { MemoryDelete } from '@/components/MemoryDelete'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface MemoryDetailPageProps {
  params: {
    id: string[]
  }
}

export default async function MemoryDetailPage({
  params,
}: MemoryDetailPageProps) {
  const token = cookies().get('token')?.value
  const id = params.id[0]

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.data

  return (
    <div className="flex flex-1 flex-col gap-10 p-8">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <div className="flex flex-1 flex-col gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Image
              className="aspect-video w-full rounded-lg object-cover"
              src={data.coverUrl}
              alt=""
              width={700}
              height={280}
            />

            <span className="text-xs text-gray-200">
              {dayjs(data.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </span>
          </div>

          <span>{data.content}</span>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
          <EditMemoryButton id={id} />
          <MemoryDelete id={id} />
        </div>
      </div>
    </div>
  )
}
