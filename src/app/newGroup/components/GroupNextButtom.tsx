'use client'

import { useStore } from '@/hooks/useStore';
import clsx from 'clsx';
import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
export const GroupNextButtom = () => {

  const {selectedUser,setMoveToNext}=useStore()
  const isSelectedUser=()=>{
   return selectedUser.length!==0
  }

  const moveToNextSession=()=>{
    setMoveToNext(true)

  }
  return (
    <div>
      <div 
       onClick={moveToNextSession}
       className={clsx('flex items-center w-[40px] h-[40px] gap-2  justify-center cursor-pointer text-white  rounded-full font-bold bg-green-700 hover:bg-green-800',
       isSelectedUser()?'block':"hidden"
      )}>
       
        <FaArrowRight/>

      </div>
    </div>
  )
}
