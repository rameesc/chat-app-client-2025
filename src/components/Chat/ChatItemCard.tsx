'use client'

import React from 'react'
type ChatItemCard={
    title:string,
    children:React.ReactNode
}
export const ChatItemCard = ({title,children}:ChatItemCard) => {
  return (
    <div className=''>
        <div className='mt-5'>
          <p className='text-v-grayText'>{title}</p>

        </div>
       
         <div className='mt-5'>
            {children}
         </div>
    </div>
  )
}
