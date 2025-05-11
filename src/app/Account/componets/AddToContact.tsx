'use client'

import { CustomButtom } from '@/components/Button/CustomButtom'
import { useQueryAuthUserData, useQueryUnContactContactUser } from '@/hooks/useQueryUser'
import { useParams } from 'next/navigation'
import React from 'react'

export const AddToContact = () => {
    const {mutate,isPending}=useQueryUnContactContactUser()
    const {data}=useQueryAuthUserData()
    const {userId}=useParams()

    const isContact=data?.contacts?.includes(userId as string)

    

    const addToContactUnContactHandler=()=>{
        mutate(userId as string)
    }

    if(isPending){

        return <p>loading..</p>
    }
  
  return (
    <div className='mt-5 flex flex-col gap-2'>
        {isContact ? (
            <CustomButtom
             title='Remove From Contact'
             
             action={addToContactUnContactHandler}
             disabled={isPending}
             color='bg-blue-500 hover:bg-blue-600'
            />
        ):(
            <CustomButtom
              title='Add To Contact'
              action={addToContactUnContactHandler}
             disabled={isPending}
             color='bg-blue-500 hover:bg-blue-600'
            />
        )}
        
        
    </div>
  )
}
