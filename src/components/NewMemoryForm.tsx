'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

interface NewMemoryFormProps {
  memory?: {
    coverUrl: string
    content: string
    createdAt: string
    id: string
  }
}

export function NewMemoryForm({ memory }: NewMemoryFormProps) {
  // const cookies = cookies() only no use client
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload: File | null = formData.get('coverUrl') as File

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      if (!memory || (memory && !!fileToUpload.size)) {
        // dont have memory or have memory but is not the same pic
        const uploadResponse = await api.post('upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      } else {
        if (memory) {
          // there's memory and is the same pic
          coverUrl = memory.coverUrl
        }
      }
    }

    const token = Cookie.get('token')
    if (memory) {
      await api.put(
        `/memories/${memory.id}`,
        {
          oldCoverUrl: memory.coverUrl,
          coverUrl,
          content: formData.get('content'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } else {
      await api.post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    }

    router.push('/')
  }
  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="midia"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="2-4 h-4" />
          Anexar mídia
        </label>
      </div>
      <MediaPicker coverUrlFromMemory={memory?.coverUrl} />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder={
          memory?.content ||
          'Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre.'
        }
      />

      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}
