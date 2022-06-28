import styled from 'styled-components';
import { Props } from './Toast';

export default styled.div<Props>`
  width: 400px;
  min-height: 60px;
  max-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  padding-right: 30px;
  border-radius: 8px;
  position: fixed;
  ${props => {
    switch(props.position?.horizontal) {
      case 'center':
        return `
          left: 50%;
          right: auto;
          transform: translateX(-50%);
        `
      case 'right': 
        return `right: 8px;`
      default:
        return `left: 8px;`
    }
  }}
  ${props => {
    switch(props.position?.vertical) {
      case 'center':
        return `
          top: 50%;
          bottom: auto;
          transform: translateY(-50%);
        `
      case 'top': 
        return `top: 8px;`
      default:
        return `bottom: 8px;`
    }
  }}
  ${props => props.position?.horizontal === 'center' && props.position.vertical === 'center' && `
    transform: translate(-50%, -50%);
  `}
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

export const TextBox = styled.p`
  width: 85%;
  max-height: 70px;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  user-select: none;
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
