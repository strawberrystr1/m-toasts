import React from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { IToastConfig } from '../types';


export const error = {
  background: '#d84315',
  icon: <BugReportIcon fontSize="large" />,
}
export const warning = {
  background: '#ffff00',
  icon: <ReportGmailerrorredIcon fontSize="large" />,
}
export const success = {
  background: '#43a047',
  icon: <CheckCircleOutlineIcon fontSize="large" />,
}
export const info = {
  background: '#9c27b0',
  icon: <HelpOutlineIcon fontSize="large" />,
}

export const positions = {
  'top-left': 'top: 10px; left: 10px;',
  'top-center': 'top: 10px; left 50%; transform: translateX(-50%);',
  'top-right': 'top: 10px; right: 10px;',
  'bottom-left': 'left 10px; bottom: 10px;',
  'bottom-right': 'right: 10px; bottom: 10px;',
  'bottom-center': 'left: 50%; bottom: 10px; transform: translateX(-50%);',
}

export const defaultToastProps: Required<IToastConfig> = {
  width: 350,
  fontSize: 20,
  position: 'bottom-left',
  height: 70,
  title: '',
  variant: 'info',
  spacing: 20,
  color: '',
  animation: 'slide',
  animationDirection: 'forward',
  isAnimated: true,
  autoHideDuration: 'none'
}