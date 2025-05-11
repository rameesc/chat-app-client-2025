'use client'

import { CustomButtom } from '@/components/Button/CustomButtom'
import { useQueryDeleteGroup } from '@/hooks/useQueryConversation'
import React from 'react'

export const RemoveGroup = () => {

    const {mutate,isPending}=useQueryDeleteGroup()

    const deleteGroup=()=>{
        mutate()
    }
  return (
    <div className='flex justify-center mt-5   '>
       <div className='flex flex-col w-full  '>
         <CustomButtom
           action={deleteGroup}
           title='Delete Group'
           color='text-red-600 bg-white text-[17px] cursor-pointer border-1 rounded-none hover:bg-red-500 hover:text-white border-red-500 w-[100%]'
           disabled={isPending}
         />
       </div>
    </div>
  )
}
