'use client'

import { CustomButtom } from '@/components/Button/CustomButtom'
import { useQueryExitFromGroup } from '@/hooks/useQueryConversation'
import { useStore } from '@/hooks/useStore'
import { useRouter } from 'next/navigation'

import React from 'react'

export const ExitFromGroup = () => {

  const {isPending,mutate}=useQueryExitFromGroup()
  const {setSelectChat}=useStore()
    
  const router=useRouter()

  const exitFromGroup=()=>{
    mutate()
    setSelectChat('')
    router.push('/')
  }
  return (
    <div className='flex justify-center mt-5   '>
       <div className='flex flex-col w-full  '>
         <CustomButtom
           action={exitFromGroup}

           title='Exit From Group'
           color='text-red-600 bg-white text-[17px] cursor-pointer border-1 rounded-none hover:bg-red-500 hover:text-white border-red-500 w-[100%]'
           disabled={isPending}
         />
       </div>
    </div>
  )
}
