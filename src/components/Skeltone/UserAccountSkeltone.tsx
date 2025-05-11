'use client'

import React from 'react'
import { MessageSkeltone } from './MessageSkeltone'
import { Skeleton } from '../ui/skeleton'

export const UserAccountSkeltone = () => {
  return (
    <div className='w-[90%] border-1 bg-white border-v-borderColor rounded-md p-5 flex flex-col    lg:w-[500px] gap-3'>
        <div className='flex justify-center'>
         <Skeleton
         className='w-[100px] h-[100px] rounded-full'
         />

        </div>
       
        <MessageSkeltone/>
        <MessageSkeltone/>
        <MessageSkeltone/>
        
    </div>
  )
}
