import styled, { keyframes } from 'styled-components';
import { Props } from './Toast';

export const ToastsWrapper = styled.div``;

export default styled.div<Props>`
  width: 400px;
  height: 60px;
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
