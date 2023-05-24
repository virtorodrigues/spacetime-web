'use client'

import { useRouter } from 'next/navigation'

interface EditMemoryButtonProps {
  id: string
}

export function EditMemoryButton({ id }: EditMemoryButtonProps) {
  const router = useRouter()

  function handleStartEditMemory() {
    router.push(`/memories/edit/${id}`)
  }

  return <button onClick={handleStartEditMemory}>Editar</button>
}
