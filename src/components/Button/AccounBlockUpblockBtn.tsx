'use client'

import React from 'react'

import { CustomButtom } from './CustomButtom'

import { useQueryAuthUserData, useQueryBlockUser } from '@/hooks/useQueryUser'
import { useParams } from 'next/navigation'


export const AccounBlockUpblockBtn = () => {
      
    const {mutate,isPending}=useQueryBlockUser()
    const {data}=useQueryAuthUserData()
    const {userId}=useParams()

    const isBlock=data?.blockedUser?.includes(userId as string)

    

    const blockAndUpBlockHandler=()=>{
        mutate(userId as string)
    }
    if(isPending){

        return <p>loading..</p>
    }
  
  return (
    <div className='mt-5 flex flex-col gap-2'>
        {isBlock ? (
            <CustomButtom
             title='Up Block'
             
             action={blockAndUpBlockHandler}
             disabled={isPending}
             color='bg-red-500 hover:bg-red-600'
            />
        ):(
            <CustomButtom
              title='Block'
              action={blockAndUpBlockHandler}
             disabled={isPending}
             color='bg-red-500 hover:bg-red-600'
            />
        )}
        
        
    </div>
  )
}
