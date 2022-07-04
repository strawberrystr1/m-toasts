import React, { ReactPortal, useRef, useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { ToastView } from './Toast';
import CreateToast from './index';

// export const Default = () => <ToastView title="Auuug" variant="error" message="Lormkamka loremkaLoremka loremka" />

export const Some = () => {
  const [openE, setOpenE] = useState(false)
  const [openS, setOpenS] = useState(false)
  const [openF, setOpenF] = useState(false)
  
  return (
    <div>
      <button onClick={() => setOpenE(prev => !prev)}>Show toast</button>
      <button onClick={() => setOpenS(prev => !prev)}>Show toast</button>
      <button onClick={() => setOpenF(prev => !prev)}>Show toast</button>
      <CreateToast message="1" open={openE} variant="error" />
      <CreateToast message="2" open={openS} variant="warning" />
      <CreateToast message="3" open={openF} variant="success" />
    </div>
  );
};

export default {
  title: 'toast',
  component: ToastView,
} as ComponentMeta<typeof ToastView>;
