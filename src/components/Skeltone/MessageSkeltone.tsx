'use client'


import React from 'react'
import { Skeleton } from '../ui/skeleton'

export const MessageSkeltone = () => {
  return (
    <div className='flex flex-col gap-2 '>
        <Skeleton className="w-[100%] h-[50px] rounded-md"/>
        <Skeleton className='w-[100%] h-[50px] rounded-md self-end'/>
        <div className=''></div>
    </div>
  )
}
