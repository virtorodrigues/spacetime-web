'use client'

import { Edit3, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EditMemoryButtonProps {
  id: string
}

export function EditMemoryButton({ id }: EditMemoryButtonProps) {
  const router = useRouter()

  const [disabled, setDisabled] = useState(false)

  function handleStartEditMemory() {
    setDisabled(true)
    router.push(`/memories/edit/${id}`)
  }

  return (
    <button
      disabled={disabled}
      className="flex items-center gap-1 rounded-full px-6 py-3 text-sm  leading-none text-gray-100 transition-colors hover:text-yellow-500/100"
      onClick={handleStartEditMemory}
    >
      {disabled ? (
        <Loader2 className="animate-spin text-yellow-500/100" size={16} />
      ) : (
        <>
          <Edit3 className="h-3.5 w-3.5" />
          Editar
        </>
      )}
    </button>
  )
}
