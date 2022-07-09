import { keyframes } from "styled-components"

import { Position } from "../types"

const animX100_0 = (sign = '') => {
  const withSign = `${sign}100%`

  return keyframes`
    from { transform: translateX(${withSign}) }
    to { transform: translateX(0) }
  `
}

const animX0_100 = (sign = '') => {
  const withSign = `${sign}100%`

  return keyframes`
    from { transform: translateX(0) }
    to { transform: translateX(${withSign}) }
  `
}

const animY100_0 = (sign = '') => {
  const withSign = `${sign}100%`

  return keyframes`
    from { transform: translateY(${withSign}) }
    to { transform: translateY(0) }
  `
}

const animY0_100 = (sign = '') => {
  const withSign = `${sign}100%`

  return keyframes`
    from { transform: translateY(0) }
    to { transform: translateY(${withSign}) }
  `
}

export const slide = {
  'top-left': {
    forward: animX100_0('-'),
    backward: animX0_100('-'),
  },
  'top-center': {
    forward: animY100_0('-'),
    backward: animY0_100('-'),
  },
  'top-right': {
    forward: animX100_0(),
    backward: animX0_100(),
  },
  'bottom-left': {
    forward: animX100_0('-'),
    backward: animX0_100('-'),
  },
  'bottom-right': {
    forward: animX100_0(),
    backward: animX0_100(),
  },
  'bottom-center': {
    forward: animY100_0(),
    backward: animY0_100(),
  },
}

const fade = {
  forward: keyframes`
    from { opacity: 0 }
    to { opacity: 1 }
  `,
  backward: keyframes`
    from { opacity: 1 }
    to { opacity: 0 }
  `,
}

export const animationResolver = (name: string, position: Position, direction: 'forward' | 'backward') => {
  switch(name) {
    case 'slide':
      return slide[position][direction]
    case 'fade':
      return fade[direction]
    default:
      return slide[position][direction]
  }
} 