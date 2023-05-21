import Image from 'next/image'
import logoSpacetime from '../assets/logo-spacetime.svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image
        src={logoSpacetime}
        width={160}
        height={48}
        alt="NLW Spacetime"
        priority={true}
      />
      <div className="max-w-[420px] space-y-1">
        <h1 className="text-3xl font-bold leading-tight text-gray-50 sm:text-5xl">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
