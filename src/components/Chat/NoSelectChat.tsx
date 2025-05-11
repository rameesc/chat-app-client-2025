'use client'

import Image from 'next/image'
import React from 'react'
import { images } from '../images'

import clsx from 'clsx'

export const NoSelectChat = () => {

  
  return (
    <div className={clsx('bg-white w-[100%] h-full items-center justify-center rounded-md  hidden md:block',
     
    )}>
        
        <div className='h-full flex justify-center items-center flex-col gap-3  '>
            <Image
              src={images.appImage}
              alt='img'
              width={100}
              height={100}
            />
            <h1 className='text-[25px] font-bold'>Chat-Application</h1>
            <p className='text-v-grayText'>chat with you friends and anyOne else</p>
            

        </div>
          

       
    </div>
  )
}
