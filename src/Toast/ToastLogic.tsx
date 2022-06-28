import React from 'react';
import ReactDOM from 'react-dom';
import { ToastView } from './Toast';

export default class Toast {
  private static toast: Toast | null = null;

  private constructor() {}

  public static getToast() {
    if (!Toast.toast) {
      Toast.toast = new Toast();
    }
    return Toast.toast;
  }

  // public create() {
  //   return ReactDOM.createPortal(<ToastView>asd</ToastView>, document.body)
  // }
}
