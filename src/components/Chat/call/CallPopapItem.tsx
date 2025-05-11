'use client'

import clsx from 'clsx'
import React from 'react'

type CallPopapItemProsp={
    children:React.ReactNode
}
export const CallPopapItem = ({children}:CallPopapItemProsp) => {
  return (
    <div className={clsx('w-full h-full bg-[#20121298] z-10 fixed top-0 left-0 flex justify-center items-center',
      
    )}>

        <div 
          className='absolute top-[50%] left-[50%] translate-[-50%] w-full  flex justify-center items-center '
         >
          {children}
        </div>
    </div>
  )
}
