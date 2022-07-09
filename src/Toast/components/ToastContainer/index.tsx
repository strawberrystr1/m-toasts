import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { ToastContainerWrapper } from '../components';
import ErrorBoundary from '../ErrorBoundary';
import Toast from '../Toast';
import { ToastService } from '../..';
import { IToastContainerProps } from '../../types';
import { GlobalStyle } from '../../constants/globalStyle';
import { defaultToastProps } from '../../constants/constants';
import { usePortal } from '../../hooks/usePortal';

const ToastContainer = forwardRef(({ rootElement, toastConfig }: IToastContainerProps, ref) => {
  
  const position = toastConfig.position ?? defaultToastProps.position

  const [_, setToasts] = useState({})
  const portal = usePortal(rootElement)

  const handleAdd = useCallback(() => {
    setToasts({})
  }, []);

  const handleRemove = useCallback(() => {
    setToasts({})
  }, [])

  useImperativeHandle(ref, () => {
    return {
      onAdd: handleAdd,
      onRemove: handleRemove,
    }
  });

  const toasts = ToastService.getAllToasts()

  return (
    ReactDOM.createPortal(
      <ErrorBoundary>
        <ToastContainerWrapper position={position}>
          {toasts.map(toast => <Toast key={toast.id} {...toast} {...toastConfig} />)}
        </ToastContainerWrapper>
        <GlobalStyle />
      </ErrorBoundary>,
      portal
    )
  );
})

export default ToastContainer;
