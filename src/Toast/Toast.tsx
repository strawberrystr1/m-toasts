import React from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom';

import StyledToast, { Button, TextBox } from './styled';
import { theme } from './theme';

export interface Props {
  message: string;
  variant?: 'error' | 'warning' | 'success' | 'info';
  color?: string;
  fontSize?: number;
  autohideDuration?: number;
  open: boolean;
  position?: { vertical: 'top' | 'bottom' | 'center', horizontal: 'left' | 'center' | 'right' }
}

const iconResolver = (variant: string) => {
  switch (variant) {
    case 'error':
      return <BugReportIcon fontSize="large" />;
    case 'warning':
      return <ReportGmailerrorredIcon fontSize="large" htmlColor="black" />;
    case 'success':
      return <CheckCircleOutlineIcon fontSize="large" />;
    default:
      return <HelpOutlineIcon fontSize="large" />;
  }
};

export const ToastView = (props: Props) => {
  const { message, open, variant = 'info', position = { vertical: 'bottom', horizontal: 'left' } } = props;

  return ReactDOM.createPortal(
    <ThemeProvider theme={theme}>
      {open && (
        <StyledToast {...props} position={position}>
          {iconResolver(variant)}
          <TextBox>{message}</TextBox>
          <Button variant={variant}>&#10006;</Button>
        </StyledToast>
      )}
    </ThemeProvider>,
    document.body
  );
};
