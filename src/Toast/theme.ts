import { DefaultTheme, createGlobalStyle } from 'styled-components';
import { Props } from './Toast';

interface A {
  position: {vertical: string, horizontal: string, offset: number}
  selector: string
}

export const GlobalStyle = createGlobalStyle<A>`
  #${props => props.selector} {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
          return `top: calc(8px + ${props.position.offset ? props.position.offset * 95 : 0}px);`;
          // return `top: 8px;`
        default:
          return `bottom: calc(8px + ${props.position.offset ? props.position.offset * 95 : 0}px);`;
          // return `bottom: 8px;`
      }
    }}
    ${props =>
      props.position?.horizontal === 'center' &&
      props.position.vertical === 'center' &&
      `
      transform: translate(-50%, -50%);
    `}
  }
`



export const theme: DefaultTheme = {
  variants: {
    error: '#d84315',
    warning: '#ffff00',
    success: '#43a047',
    info: '#9c27b0',
  },
  fontColor: {
    black: '#000',
    white: '#fff',
  },
};
