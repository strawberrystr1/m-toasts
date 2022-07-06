import React, { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { ToastView } from './Toast';
import CreateToast from './index';
import ToastService from '../Toast2/ToastService';

// export const Default = () => <ToastView title="Auuug" variant="error" message="Lormkamka loremkaLoremka loremka" />

export const Some = () => {
  
  const t = new ToastService()
  const t1 = t.createToast({ message: 'toast', variant: 'success' })
  console.log(t1, t)

  const del = () => {
    t.removeToast(t1.id)
    console.log(t)
  }

  return (
    <div>
      <button onClick={del}>a</button>
    </div>
  );
};

export default {
  title: 'toast',
  component: ToastView,
} as ComponentMeta<typeof ToastView>;
