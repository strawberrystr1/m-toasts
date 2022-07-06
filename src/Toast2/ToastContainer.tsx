import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainerWrapper } from './components';
import ErrorBoundary from './ErrorBoundary';
import { GlobalStyle } from './globalStyle';
import Toast from './Toast';
import { IToastContainerProps } from './types';

const ToastContainer = ({
  rootElement,
}: IToastContainerProps) => {
  const [portal, setPortal] = useState<HTMLElement>(document.body);

  // хук который следит за созданием тостов

  useLayoutEffect(() => {
    if (rootElement) {
      const portal = document.getElementById(rootElement);
      if (!portal) {
        const root = document.createElement('div');
        root.id = rootElement;
        document
          .getElementById('root')
          ?.insertAdjacentElement('afterend', root);
        setPortal(root);
      } else {
        setPortal(portal);
      }
    }

    return () => document.getElementById(rootElement as string)?.remove();
  }, [rootElement]);

  return (
    ReactDOM.createPortal(
      <ErrorBoundary>
        <Toast {...props} />
      </ErrorBoundary>,
      // <ToastContainerWrapper position={position}>
      //   {children}
      //   <GlobalStyle />
      // </ToastContainerWrapper>,
      portal
    )
  );
};

export default ToastContainer;
