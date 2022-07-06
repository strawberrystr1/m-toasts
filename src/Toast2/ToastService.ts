import { v4 } from 'uuid'
import { ICreateToastProps, IStorageToastItem } from './types';

class ToastService {
  toasts: IStorageToastItem[] = []

  getAllToasts = () => {
    return this.toasts
  }

  addToast = (toast: IStorageToastItem) => {
    if (this.toasts.length < 3) {
      this.toasts.push(toast)
    }
  }

  private setBackwardsAnimationDirection = (id: string) => {
    this.toasts = this.toasts.map(toast => {
      if (toast.id === id) {
        return { ...toast, animationDirection: 'backward'}
      }
      return toast
    })
  } 

  removeToast = (toastId: string) => {
    this.setBackwardsAnimationDirection(toastId)
    this.toasts = this.toasts.filter(el => el.id !== toastId)
    console.log('deleted')
  }

  createToast = (props: ICreateToastProps): IStorageToastItem => {
    const newToast: IStorageToastItem = {
      fontSize: 20,
      position: 'bottom-left',
      height: 70,
      title: '',
      variant: 'info',
      spacing: 20,
      color: '',
      animation: 'slide',
      animationDirection: 'forward',
      ...props,
      width: props.width ? props.width < 150 ? 250 : props.width : 350,
      id: v4(),
      removeToast: (id) => this.removeToast(id)
    }
    this.addToast(newToast)

    return newToast
  }
}

export default ToastService