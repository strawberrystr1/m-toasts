import React, { useEffect } from 'react';

import { ComponentMeta } from '@storybook/react';

import ToastService from './index';
import { ToastView } from '../Toast/Toast';
import Toast from './Toast';
import ToastContainer from './ToastContainer';

export const Second = () => {

  const toast = ToastService.createToast({ message: 'loremka twice', variant: 'warning' })

  const createToast = () => {
    const toas = ToastService.createToast({ message: 'loremka twice', variant: 'error' })
    console.log(ToastService.toasts)
    return <Toast {...toas} />
  }

  return (
    <div>
      <button >add</button>
      <ToastContainer />
    </div>
  );
};

export default {
  title: 'toast',
  component: ToastView,
} as ComponentMeta<typeof ToastView>;
