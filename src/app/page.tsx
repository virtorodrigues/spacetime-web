'use client'

import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>([])

  useEffect(() => {
    async function getMemories() {
      const token = Cookies.get('token')

      if (token) {
        const response = await api.get('/memories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setMemories(response.data || ([] as Memory[]))
      }
    }
    getMemories()
  }, [setMemories])

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              className="aspect-video w-full rounded-lg object-cover"
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="2-4 h-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
