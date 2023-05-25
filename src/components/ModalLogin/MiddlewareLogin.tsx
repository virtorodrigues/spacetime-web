import Cookies from 'js-cookie'
import { ReactNode } from 'react'
import { RootModal } from './RootModal'

interface MiddlewareLoginProps {
  children: ReactNode
}

export function MiddlewareLogin({ children }: MiddlewareLoginProps) {
  function isLogged() {
    const token = Cookies.get('token')

    return !!token
  }

  if (isLogged()) {
    return <>{children}</>
  } else {
    return <RootModal>{children}</RootModal>
  }
}
