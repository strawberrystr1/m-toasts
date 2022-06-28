import React from 'react'

import { ComponentMeta } from '@storybook/react'

import {ToastView} from './Toast'

export default {
  title: 'toast',
  component: ToastView,
} as ComponentMeta<typeof ToastView>

export const Default = () => <ToastView open={true} variant="error" message="Lormkamka loremkaLoremka loremka" />