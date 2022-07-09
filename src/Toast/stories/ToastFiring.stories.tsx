import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { ToastProvider } from '..';
import { useToastService } from '../hooks/useToast';
import { ToastService } from '..';
import { TestButton } from '../components/components';
import { IToastConfig } from '../types';

export const ToastFromButton = (args: IToastConfig) => {
  const notify = useToastService();
  ToastService.toasts = []
  const handleErrorToast = () => notify.error('Example');
  const handleWarningToast = () => notify.warning('Example');
  const handleSuccessToast = () => notify.success('Example');
  const handleInfoToast = () => notify.info('Example');
  return (
    <div>
      <TestButton data-test-id="btn-error" color="#d84315" onClick={handleErrorToast}>Add error toast</TestButton>
      <TestButton data-test-id="btn-warning" color="#ffff00" onClick={handleWarningToast}>Add warning toast</TestButton>
      <TestButton data-test-id="btn-success" color="#43a047" onClick={handleSuccessToast}>Add success toast</TestButton>
      <TestButton data-test-id="btn-info" color="#9c27b0" onClick={handleInfoToast}>Add info toast</TestButton>
      <ToastProvider {...args}/>
    </div>
  );
};

export default {
  title: 'Toast from button',
  component: ToastProvider,
  argTypes: {
    position: {
      table: {
        defaultValue: {
          summary: 'bottom-left'
        }
      }
    },
    width: {
      table: {
        defaultValue: {
          summary: '350'
        }
      }
    },
    height: {
      table: {
        defaultValue: {
          summary: '70'
        }
      }
    },
    spacing: {
      table: {
        defaultValue: {
          summary: '20'
        }
      }
    },
    animation: {
      table: {
        defaultValue: {
          summary: 'slide'
        }
      }
    },
    fontSize: {
      table: {
        defaultValue: {
          summary: '20'
        },
      }
    },
    autoHideDuration: {
      table: {
        defaultValue: {
          summary: 'none'
        }
      },
      control: { type: 'number' },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'info'
        },
      },
      options: ['info', 'warning', 'error', 'success']
    },
    isAnimated: {
      table: {
        disable: true,
      }
    },
    animationDirection: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Here you can watch all possible toasts'
      }
    }
  }
} as ComponentMeta<typeof ToastProvider>;
