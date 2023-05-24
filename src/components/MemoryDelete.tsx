'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

interface MemoryDeleteProps {
  id: string
}

export function MemoryDelete({ id }: MemoryDeleteProps) {
  const router = useRouter()

  async function handleDelete() {
    const token = Cookie.get('token')

    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.push('/')
  }

  return <button onClick={handleDelete}>deletar</button>
}
