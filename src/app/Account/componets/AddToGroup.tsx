'use client'

import { CustomButtom } from '@/components/Button/CustomButtom'
import React from 'react'
type AddToGroupProsp={
    action:()=>void,
    disabled:boolean
}
export const AddToGroup = ({action,disabled}:AddToGroupProsp) => {
  return (
    <div className='flex justify-center mt-5   '>
       <div className='flex flex-col w-full  '>
         <CustomButtom
           action={action}

           title='Add To Group'
           color='text-blue-600 bg-white text-[17px] cursor-pointer border-1 rounded-none hover:bg-blue-500 hover:text-white border-blue-500 w-[100%]'
           disabled={disabled}
         />
       </div>
    </div>
  )
}
