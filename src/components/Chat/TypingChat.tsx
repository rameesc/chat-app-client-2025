'use client'

import React from 'react'
import { PulseLoader } from 'react-spinners'

export const TypingChat = () => {
  return (
    <div className='flex items-center gap-1 text-white'>
        <p>Type</p>
        <PulseLoader
      
         color='white'
        />
    </div>
  )
}
