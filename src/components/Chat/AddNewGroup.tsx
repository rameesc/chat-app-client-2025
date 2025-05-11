'use client'

import { useUserInformation } from '@/hooks/useUserInformation'
import { useRouter } from 'next/navigation'
import React from 'react'

export const AddNewGroup = () => {

    const route=useRouter()
    const userData=useUserInformation()

   

    const moveToCreateNewGroup=()=>{
        
        route.push(`/newGroup/${userData?.user?.id}`)
    }
  return (
    <div className=' bg-white p-2 flex flex-col '>
        <div onClick={()=>moveToCreateNewGroup()} className='p-1 border-2 self-end border-green-500 rounded-full hover:bg-green-600 cursor-pointer '>
            <p className='text-green-600 hover:text-white'>Create New Group</p>
        </div>
    </div>
  )
}
