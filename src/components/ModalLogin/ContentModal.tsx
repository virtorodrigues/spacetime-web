'use client'

import { GithubIcon, Loader2, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import Image from 'next/image'
import googleLogo from '../../assets/google-logo.svg'
import Link from 'next/link'

export function ContentModal() {
  const gitHubLogin = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
  const googleLogin = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`

  const [disabledGoogle, setDisabledGoogle] = useState(false)
  const [disabledGithub, setDisabledGithub] = useState(false)

  function handleLoginGithub(event: FormEvent) {
    if (disabledGithub || disabledGoogle) {
      event.preventDefault()
    }

    if (!disabledGithub && !disabledGoogle) {
      setDisabledGithub(true)
    }
  }

  function handleLoginGoogle(event: FormEvent) {
    if (disabledGithub || disabledGoogle) {
      event.preventDefault()
    }

    if (!disabledGoogle && !disabledGithub) {
      setDisabledGoogle(true)
    }
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 z-[999] h-screen w-screen bg-[#00000075]" />
      <AlertDialog.Content className="fixed left-2/4 top-2/4 z-[9999] max-h-full w-full max-w-full translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg bg-gray-900 p-10 md:max-w-sm ">
        <AlertDialog.Title className="mb-6 mt-2 text-sm font-bold text-gray-100">
          Entre com suas conta favorita🔥
        </AlertDialog.Title>
        <AlertDialog.Cancel className="fixed right-6 top-6 leading-none">
          <X className="h-4 w-4 font-bold text-gray-100" />
        </AlertDialog.Cancel>

        <Link
          href={googleLogin}
          className="1 mb-3 flex w-full items-center justify-center rounded bg-red-500 py-2 text-white hover:bg-red-600"
          onClick={handleLoginGoogle}
        >
          {disabledGoogle ? (
            <Loader2 className="animate-spin text-yellow-500/100" size={16} />
          ) : (
            <>
              <Image
                src={googleLogo}
                alt="logo google"
                className="mr-2 inline-block h-4 w-4"
              />
              Login com Google
            </>
          )}
        </Link>

        <Link
          href={gitHubLogin}
          onClick={handleLoginGithub}
          className={`flex w-full items-center justify-center rounded bg-gray-500 py-2 text-white hover:bg-gray-600`}
        >
          {disabledGithub ? (
            <Loader2 className="animate-spin text-yellow-500/100" size={16} />
          ) : (
            <>
              <GithubIcon className="mr-2 inline-block h-4 w-4" />
              Login com Github
            </>
          )}
        </Link>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}
