export interface IToastConfig {
  position: Position
  width: number
  height: number
  spacing: number
  color: string
  animation: 'fade' | 'slide'
  fontSize: number
  variant?: ToastVariant
  title?: string
  animationDirection: 'forward' | 'backward'
  isAnimated: boolean
  autoHideDuration: NumberOrNone
}

export type NumberOrNone = number | 'none' 

export type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ICreateToastProps extends Omit<Partial<IToastConfig>, 'animationDirection' | 'isAnimated'> {
  message: string
  title?: string
}

export interface IStorageToastItem extends Required<ICreateToastProps>, Pick<IToastConfig, 'animationDirection' | 'isAnimated'> {
  id: string
  removeToast: (id: string) => void
  timer: (id: string, duration: number) => NodeJS.Timeout | undefined
}

export type ToastVariant = 'error' | 'warning' | 'success' | 'info'

export interface IToastContainerProps {
  rootElement?: string
  toastConfig: Partial<IToastConfig>
}