'use client'

import { images } from '@/components/images'
import Image from 'next/image'
import React from 'react'
import { IoCallSharp } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";

type CallNotificationProsp={
    callReject:()=>void,
    joinCall:()=>void
}
export const CallNotification = ({callReject,joinCall}:CallNotificationProsp) => {

    
  return (
    <div className=' w-[80%] bg-white rounded-md p-5 md:w-[300px] flex flex-col justify-between gap-3 items-center'>

        <div className='flex flex-col items-center'>
            <Image
             src={images?.user}
             alt='img'
             width={50}
             height={50}
             className=' rounded-full w-[50px] h-[50px]'


            />
            <p>{'user name'}</p>
        </div>
        <div className='flex gap-2 justify-between w-[80%]'>
            <div onClick={joinCall} className='bg-green-500 cursor-pointer hover:bg-green-600 w-[40px] h-[40px] flex justify-center items-center rounded-full text-white'>
                <IoCallSharp/>

            </div>
            <div onClick={callReject} className='bg-red-500 cursor-pointer hover:bg-red-600 w-[40px] h-[40px] flex justify-center items-center rounded-full text-white'>
             <MdCallEnd/>

            </div>
            
        </div>
    </div>
  )
}
