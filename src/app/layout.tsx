import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { cookies } from 'next/headers'
import { Profile } from '@/components/Profile'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
dayjs.locale(ptBr)

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'Spacetime',
  description:
    'Uma cápsula do tempo constrúida em React, Next.js, TailwindCSS e TypeScript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="pt">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="xs:grid-cols-1 grid min-h-screen  lg:grid-cols-2">
          {/* left */}
          <div className="relative flex h-screen flex-col items-start justify-between gap-10 overflow-hidden border-r border-white/10 bg-[url('../assets/bg-stars.svg')] bg-cover px-10 py-16 sm:h-full md:px-28">
            {/* blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 blur-full" />

            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />
            <Copyright />
          </div>

          {/* right */}
          <div className="max-h-sreen flex h-screen max-h-screen flex-col overflow-y-scroll bg-[url('../assets/bg-stars.svg')] bg-cover sm:h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
