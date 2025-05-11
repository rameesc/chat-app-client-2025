'use client'

import React from 'react'
import { TooltipItem } from './CloseButton'
import { IoClose } from 'react-icons/io5'
type FilePopapProps={
    children:React.ReactNode,
    closeHandler:()=>void
}
export const FilePopap = ({children,closeHandler}:FilePopapProps) => {
  return (
    <div className=' fixed top-0 left-0 w-[100%] h-full bg-[#252424e3] z-10'>
        <div className=' absolute right-[10px] top-[20px]'>
          <TooltipItem
            action={closeHandler}
            tooltipTitle='Close'
          >
            <IoClose
           
             className='text-white'
             size={32}/>
          </TooltipItem>
        </div>

        <div className='absolute top-[50%] left-[50%]   translate-[-50%]'>
            {children}
        </div>
        
    </div>
  )
}
