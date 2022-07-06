import React, { useState } from 'react'

import { Button, Message, TextBox, Title, ToastContainerWrapper, ToastWrapper } from './components'
import { IStorageToastItem } from './types'
import * as variants from './constants'
import ToastContainer from './ToastContainer'
import ToastService from '.'

const Toast = (toast: IStorageToastItem) => {
  const { variant, fontSize, title, message, position, id, removeToast, width } = toast

  const [dragStarted, setDragStarted] = useState(false)
  const [startPosition, setStartPosition] = useState(0)

  const handleRemove = () => removeToast(id)

  const handleDragStart = (e: React.MouseEvent) => {
    setDragStarted(true)
    setStartPosition(e.clientX)
  }

  const handleDragEnd = () => {
    setDragStarted(false)
    setStartPosition(0)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStarted) {
      const removeValue = width > 250 ? 150 : width / 3 
      if (Math.abs(startPosition - e.clientX) > removeValue) {
        removeToast(id)
        handleDragEnd()
      }
    }
  }

  return (
    <ToastContainerWrapper position={position}> //map
      <ToastWrapper {...toast} onMouseDown={handleDragStart} onMouseLeave={handleDragEnd} onMouseMove={handleMouseMove} onMouseUp={handleDragEnd}>
        {variants[variant!].icon}
        <TextBox>
          <Title fontSize={fontSize}>{title}</Title>
          <Message>{message}</Message>
        </TextBox>
        <Button variant={variant} onClick={handleRemove}>
          &#10006;
        </Button>
      </ToastWrapper>
    </ToastContainerWrapper>
  )
}

export default Toast