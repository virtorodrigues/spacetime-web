'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  coverUrlFromMemory?: string
}

export function MediaPicker({ coverUrlFromMemory }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(
    coverUrlFromMemory || null,
  )

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previwURL = URL.createObjectURL(files[0])

    setPreview(previwURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="midia"
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
