'use client'



import React from 'react'
import { FirstStepCreateGroup } from './FirstStepCreateGroup'
import { SecondStepToCreateGroup } from './SecondStepToCreateGroup'
import { useStore } from '@/hooks/useStore'

export const CreateNewGroupItem = () => {

  const {moveToNextSession}=useStore()
   
  return (
    <div className='p-5  border-1 rounded-md border-v-borderColor m-5 w-[90%] lg:w-[500px] h-full flex flex-col'>
      {moveToNextSession ?(
        <SecondStepToCreateGroup/>
      )
      :(
        <FirstStepCreateGroup/>
      )}
      
       
    </div>
  )
}
