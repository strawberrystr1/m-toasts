import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    variants: {
      error: string
      warning: string
      success: string
      info: string
    }
    fontColor: {
      black: string
      white: string
    }
  }
}