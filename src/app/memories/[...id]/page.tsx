'use client'

import { EditMemoryButton } from '@/components/EditMemoryButton'
import { MemoryDelete } from '@/components/MemoryDelete'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MemoryDetailPageProps {
  params: {
    id: string[]
  }
}

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default function MemoryDetailPage({ params }: MemoryDetailPageProps) {
  const [memory, setMemory] = useState<Memory | null>(null)
  const id = params.id[0]

  useEffect(() => {
    async function getMemory() {
      const token = Cookies.get('token')

      const response = await api.get(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.data
      setMemory(data as Memory)
    }

    getMemory()
  }, [id])

  return (
    <div className="flex flex-1 flex-col gap-10 p-8">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      {memory && (
        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Image
                className="aspect-video w-full rounded-lg object-cover"
                src={memory.coverUrl}
                alt=""
                width={700}
                height={280}
              />

              <span className="text-xs text-gray-200">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </span>
            </div>

            <span>{memory.content}</span>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <EditMemoryButton id={id} />
            <MemoryDelete id={id} />
          </div>
        </div>
      )}
    </div>
  )
}
