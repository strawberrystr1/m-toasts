import React, { useRef, useState, useEffect } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ThemeProvider } from 'styled-components';
import { Transition } from 'react-transition-group';

import StyledToast, { Button, TextBox, Title, Description } from './styled';
import { theme } from './theme';
import Toast from './ToastLogic';
import ReactDOM from 'react-dom';

export interface Position { vertical: 'top' | 'bottom' | 'center', horizontal: 'left' | 'center' | 'right', offset?: number }
export interface Props {
  message: string;
  title?: string;
  variant?: 'error' | 'warning' | 'success' | 'info';
  color?: string;
  fontSize?: number;
  autohideDuration?: number;
  position?: Position
  animationAppearance?: 'left' | 'right' | 'top' | 'bottom'
  open: boolean
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
  const { message, title, variant = 'info', autohideDuration, position = { vertical: 'bottom', horizontal: 'left' } } = props;

  const [open, setOpen] = useState(true)
  const toaster = Toast.getToast()
  
  const handleClick = () => {
    console.log(toaster.storage)
  }

  useEffect(() => {
    console.log('rendered')
    // ReactDOM.unmountComponentAtNode(document.querySelector('#portal') as HTMLElement)
  }, [])

  return <ThemeProvider theme={theme}>
    {/* {open && ( */}
      <StyledToast {...props}>
        {iconResolver(variant)}
        <TextBox>
          {title && <Title fontSize={props.fontSize}>{title}</Title>}
          <Description>{message}</Description>
        </TextBox>
        <Button variant={variant} onClick={handleClick}>&#10006;</Button>
      </StyledToast>
    {/* )} */}
  </ThemeProvider>
};
