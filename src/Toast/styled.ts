import styled, { keyframes } from 'styled-components';
import { Props } from './Toast';

const slide_left = keyframes`
  from {
    transform: translateX(-200%)
  }
  to {
    transform: translateX(0)
  }
`;

export const ToastsWrapper = styled.div<Pick<Props, 'position'>>`
  position: fixed;
  ${props => {
    switch (props.position?.horizontal) {
      case 'center':
        return `
          left: 50%;
          right: auto;
          transform: translateX(-50%);
        `;
      case 'right':
        return `right: 8px;`;
      default:
        return `left: 8px;`;
    }
  }}
  ${props => {
    switch (props.position?.vertical) {
      case 'center':
        return `
          top: 50%;
          bottom: auto;
          transform: translateY(-50%);
        `;
      case 'top':
        return `top: calc(8px + ${props.position!.offset! * 115}px);`;
      default:
        return `bottom: calc(8px + ${props.position!.offset! * 115}px);`;
    }
  }}
  ${props =>
    props.position?.horizontal === 'center' &&
    props.position.vertical === 'center' &&
    `
    transform: translate(-50%, -50%);
  `}
`;

export default styled.div<Props>`
  width: 400px;
  height: 80px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  padding-right: 30px;
  border-radius: 8px;
  background-color: ${props => {
    switch (props.variant) {
      case 'error':
        return props.theme.variants.error;
      case 'success':
        return props.theme.variants.success;
      case 'warning':
        return props.theme.variants.warning;
      default:
        return props.theme.variants.info;
    }
  }};
  background-color: ${props => props.color};
  color: ${props => {
    switch (props.variant) {
      case 'warning':
        return props.theme.fontColor.black;
      default:
        return props.theme.fontColor.white;
    }
  }};
  font-size: ${props => (props.fontSize ? props.fontSize : 20)}px;
  /* animation: 0.5s ease-in ${slide_left}; */

  & *::-webkit-scrollbar {
    width: 5px;
    border-radius: 9em;
    background-color: #c3c6ca;
  }

  & *::-webkit-scrollbar-thumb {
    background-color: #5f575c;
    border-radius: 9em;
  }
`;

export const TextBox = styled.div`
  width: 85%;
  max-height: 70px;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  user-select: none;
`;

export const Description = styled.p`
  margin: 0;
  padding: 0;
`;

export const Title = styled.p<Pick<Props, 'fontSize'>>`
  height: ${props => (props.fontSize ? props.fontSize + 10 : 30)}px;
  font-size: ${props => (props.fontSize ? props.fontSize + 5 : 26)}px;
  margin: 0;
  padding: 0;
`;

export const Button = styled.button<Pick<Props, 'variant'>>`
  position: absolute;
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  top: 5px;
  right: 5px;
  color: ${props => {
    switch (props.variant) {
      case 'warning':
        return props.theme.fontColor.black;
      default:
        return props.theme.fontColor.white;
    }
  }};
`;
