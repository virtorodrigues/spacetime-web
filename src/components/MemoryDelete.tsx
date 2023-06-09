'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { Loader2, LucideTrash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface MemoryDeleteProps {
  id: string
}

export function MemoryDelete({ id }: MemoryDeleteProps) {
  const router = useRouter()

  const [disabled, setDisabled] = useState(false)

  async function handleDelete() {
    setDisabled(true)
    const token = Cookie.get('token')

    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.push('/')
  }

  return (
    <button
      disabled={disabled}
      className="flex items-center gap-1 rounded-full px-6 py-3 text-sm leading-none text-gray-100 transition-colors hover:text-red-500/100"
      onClick={handleDelete}
    >
      {disabled ? (
        <Loader2 className="animate-spin text-red-500/100" size={16} />
      ) : (
        <>
          <LucideTrash2 className=" h-3.5 w-3.5 " />
          Deletar
        </>
      )}
    </button>
  )
}
