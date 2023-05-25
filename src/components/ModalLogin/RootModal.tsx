import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { ContentModal } from './ContentModal'
import { ReactNode } from 'react'

interface RootModalProps {
  children: ReactNode
}

export function RootModal({ children }: RootModalProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <ContentModal />
    </AlertDialog.Root>
  )
}
