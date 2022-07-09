import React, { useEffect, useState } from 'react'

import { Button, Message, TextBox, Title, ToastWrapper } from '../components'
import { IStorageToastItem } from '../../types'
import * as variants from '../../constants/constants'

const Toast = (toast: IStorageToastItem) => {
  const { variant, fontSize, title, message, id, removeToast, width, timer, autoHideDuration } = toast

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

  useEffect(() => {
    if (autoHideDuration === 'none') return
    const timerId = timer(id, autoHideDuration)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <ToastWrapper data-test-id={toast.variant} {...toast} onMouseDown={handleDragStart} onMouseLeave={handleDragEnd} onMouseMove={handleMouseMove} onMouseUp={handleDragEnd}>
      {variants[variant].icon}
      <TextBox>
        <Title fontSize={fontSize}>{title}</Title>
        <Message>{message}</Message>
      </TextBox>
      <Button variant={variant} onClick={handleRemove}>
        &#10006;
      </Button>
    </ToastWrapper>
  )
}

export default Toast