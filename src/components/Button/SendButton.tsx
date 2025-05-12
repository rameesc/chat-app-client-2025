'use client'

import React from 'react'
import { IoSend } from "react-icons/io5";
import { LoadingSpinner } from '../LoadingSpinner';

type LoadingButtonType={
    // type:'button'|'submit'|'reset',
    // title:string,
    // color?:string,
    disabled?:boolean
    sendImage:()=>void
}
export const SendButton = ({disabled,sendImage}:LoadingButtonType) => {
   
  return (
    <div >
        <div 
          onClick={sendImage}
         className='w-[40px] hover:scale-[1.2] icon h-[40px] bg-[#3964da] rounded-full flex justify-center items-center'>
           {!disabled?
             <IoSend size={20}/> 
             :
             <LoadingSpinner
               color='white'
               size={20}
             />
             }
        </div>
    </div>
  )
}
