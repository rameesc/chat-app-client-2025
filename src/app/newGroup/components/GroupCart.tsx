'use client'

import React from 'react'

type GroupCartProps={
    title:string,
    children:React.ReactNode
}
export const GroupCart = ({title,children}:GroupCartProps) => {
  return (
    <div className='mt-5'>
        <div>
          <p className=' font-[500]'>{title}</p>
        </div>
        <div>
            {children}
        </div>

    </div>
    
  )
}

