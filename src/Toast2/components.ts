import styled from "styled-components"

import { IStorageToastItem, IToastConfig } from "./types"
import * as variants from './constants'
import { animationResolver } from "./animations"

export const ToastWrapper = styled.div<IStorageToastItem>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.color ? props.color : variants[props.variant!].background};
  display: flex;
  align-items: center;
  padding: ${props => props.spacing}px ${props => props.spacing - 5}px;
  border-radius: 8px;
  font-size: ${props => props.fontSize}px;
  position: relative;
  color: ${props => props.variant === 'warning' ? 'black' : 'white'};
  animation: ${props => 
    animationResolver(props.animation, props.position, props.animationDirection)}
    0.4s cubic-bezier(0.39, 0.575, 0.565, 1) 0s;
  &:active {
    cursor: grabbing;
  }
`

export const Title = styled.p<Pick<IToastConfig, 'fontSize'>>`
  font-size: ${props => props.fontSize + 4}px;
  text-transform: capitalize;
  pointer-events: none;
  user-select: none;
`

export const Message = styled.p`
  pointer-events: none;
  user-select: none;
`

export const TextBox = styled.div`
  margin-left: 10px;
  user-select: none;
`

export const Button = styled.button<Pick<IToastConfig, 'variant'>>`
  position: absolute;
  border: none;
  background-color: transparent;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
  top: 6px;
  right: 6px;
  color: ${props => {
    switch (props.variant) {
      case 'warning':
        return 'black';
      default:
        return 'white';
    }
  }};
`;

export const ToastContainerWrapper = styled.div<Pick<IStorageToastItem, 'position'>>`
  width: fit-content;
  height: fit-content;
  position: fixed;
  ${props => variants.positions[props.position]}
`