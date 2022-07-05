import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ThemeProvider } from 'styled-components';

import StyledToast, { Button, TextBox, Title, Description } from './styled';
import { theme, GlobalStyle } from './theme';
import Toast from './ToastLogic';

export interface Position {
  vertical: 'top' | 'bottom' | 'center';
  horizontal: 'left' | 'center' | 'right';
  offset?: number;
}
export interface Props {
  message: string;
  title?: string;
  variant?: 'error' | 'warning' | 'success' | 'info';
  color?: string;
  fontSize?: number;
  autohideDuration?: number;
  position?: Position;
  animationAppearance?: 'left' | 'right' | 'top' | 'bottom';
  open: boolean;
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
  const { message, title, open, variant = 'info', autohideDuration, position = { vertical: 'bottom', horizontal: 'left' } } = props;

  const toaster = Toast.getToast();
  const unicId = `${props.message}-${props.title ? props.title : ''}`;
  
  const nextPosition = {
    ...position,
    offset: 0
  }

  const handleClick = () => {
    console.log(toaster.storage);
  };

  useLayoutEffect(() => {
    const el = document.getElementById(`portal-${unicId}`)

    if (!el) {
      const wrapperElement = document.createElement('div');
      wrapperElement.setAttribute("id", `portal-${unicId}`);
      document.body.appendChild(wrapperElement);
    }

    return () => document.getElementById(`portal-${unicId}`)?.remove()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StyledToast {...props}>
        {iconResolver(variant)}
        <TextBox>
          {title && <Title fontSize={props.fontSize}>{title}</Title>}
          <Description>{message}</Description>
        </TextBox>
        <Button variant={variant} onClick={handleClick}>
          &#10006;
        </Button>
      </StyledToast>
      <GlobalStyle position={nextPosition} selector={`portal-${unicId}`}/>
    </ThemeProvider>
  );
};
