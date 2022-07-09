import { v4 } from 'uuid';

import { defaultToastProps } from '../constants/constants';
import { ICreateToastProps, IStorageToastItem, NumberOrNone } from '../types';

export interface RefFunctions {
  onAdd: () => void;
  onRemove: () => void;
}
class ToastService {
  toasts: IStorageToastItem[] = [];
  toastRef: RefFunctions | undefined = { onAdd: () => {}, onRemove: () => {} };

  init = (ref: RefFunctions | undefined) => {
    this.toastRef = ref;
  };

  getAllToasts = () => {
    return this.toasts;
  };

  addToast = (toast: IStorageToastItem) => {
    if (this.toasts.length < 3) {
      this.toasts.push(toast);
      this.toastRef?.onAdd();
    }
  };

  private setBackwardsAnimationDirection = (id: string) => {
    this.toasts = this.toasts.map(toast => {
      if (toast.id === id) {
        return { ...toast, animationDirection: 'backward', isAnimated: true };
      }
      return toast;
    });
    this.toastRef?.onRemove();
  };

  removeToast = (toastId: string) => {
    this.setBackwardsAnimationDirection(toastId);
    setTimeout(() => {
      this.toasts = this.toasts.filter(el => el.id !== toastId);
    }, 100);
    setTimeout(() => {
      this.toastRef?.onRemove();
    }, 390);
  };

  timer = (id: string, duration: NumberOrNone) => {
    if (duration === 'none') return
    const timer = setTimeout(() => {
      this.removeToast(id);
    }, duration);
    return timer;
  };

  createToast = (props: ICreateToastProps): IStorageToastItem => {
    const newToast: IStorageToastItem = {
      ...defaultToastProps,
      ...props,
      width: props.width ? (props.width < 150 ? 250 : props.width) : 350,
      id: v4(),
      removeToast: id => this.removeToast(id),
      timer: (id, time) => this.timer(id, time)
    };
    this.addToast(newToast);

    return newToast;
  };
}

export default ToastService;
