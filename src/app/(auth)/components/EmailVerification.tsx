'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import AuthCardItem from './AuthCardItem'
import { ShowErrorMessage } from '@/components/Error/ShowErrorMessage'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useQueryEmailVerififcation } from '@/hooks/useQueryAuth'

import clsx from 'clsx'

export const EmailVerification = () => {
    const search =useSearchParams()

    const {data,mutate}=useQueryEmailVerififcation()
    const token=search.get("token")


    console.log(data)

  

    useEffect(()=>{
       
        mutate(token as string)

    },[token,mutate])
  return (
    <AuthCardItem
     title='Email Verification'
     link='/login'
     linkText='Login'
     linkDescription='If you already have an account please click here'
    >
        <div className={clsx('gap-2 flex flex-col items-center',
            
        )}>
         <ShowErrorMessage
          status={data?.status}
          message={data?.message}
         />

         <div className={clsx('',
            data?.status ? 'hidden':"block"
         )}>
          <LoadingSpinner
            color='green'
            size={40}
          />

         </div>
        
          

        
         

        </div>
      
    </AuthCardItem>
  )
}
