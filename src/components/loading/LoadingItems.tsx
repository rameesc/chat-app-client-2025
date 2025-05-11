'use client'

import React from 'react'
import { MoonLoader } from 'react-spinners'

export const LoadingItems = () => {
  return (
    <div className='w-full h-full bg-[#2e2c2c50] fixed top-0 left-0 z-10'>

        <div className=' absolute top-[50%] left-[50%] translate-[-50%]'>
         <MoonLoader
          size={50}
          
         />
        </div>
    </div>
  )
}
