'use client'

import { Toaster } from 'react-hot-toast';
import React from 'react'

export const ToastProvider = () => {
  return (
    <Toaster
     toastOptions={{
        removeDelay:3000
     }}
     position='top-center'
      
    />
  )
}
