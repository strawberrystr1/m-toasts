import { ReactNode } from "react"

export interface IToastConfig {
  position: Position
  width: number
  height: number
  spacing: number
  color: string
  animation: string
  fontSize: number
  variant?: ToastVariant
}

export type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ICreateToastProps extends Partial<IToastConfig> {
  message: string
  title?: string
}

export interface IStorageToastItem extends Required<ICreateToastProps> {
  id: string
  animationDirection: 'forward' | 'backward'
  removeToast: (id: string) => void
}

type ToastVariant = 'error' | 'warning' | 'success' | 'info'

export interface IToastContainerProps {
  rootElement?: string
}