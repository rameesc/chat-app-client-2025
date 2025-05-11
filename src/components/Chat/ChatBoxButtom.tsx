'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";

import { SendMessageForm } from './SendMessageForm';
import { MdEmojiEmotions } from 'react-icons/md';
import clsx from 'clsx';

import { UploadFiles } from './UploadFiles';
import { useStore } from '@/hooks/useStore';
import { EmojiItems } from './EmojiItems';

export const ChatBoxButtom = () => {

  const {showEmoji,setShowEmoji}=useStore()
  const [openFile,setOpenFile]=useState(false)

  const closeItem=useRef<HTMLDivElement>(null)
 

  const openFileHandler=()=>{
    setOpenFile(true)
  }

  const handleClickedOutSide=(e:MouseEvent)=>{
    if(closeItem.current && !closeItem.current.contains(e.target as Node)){
      setOpenFile(false)
     
    }
  
    

  }

  useEffect(()=>{

    if(!openFile ) return

    document.addEventListener("mousedown",handleClickedOutSide)

    return ()=>{
      document.removeEventListener("mousedown",handleClickedOutSide)
    }

  },[openFile])

  const ShowEmojiHandler=()=>{
    setShowEmoji(!showEmoji)
  }

  


  return (
    <div className='p-2 w-full flex relative   justify-between items-center gap-2 bg-white mt-3'>
      
        <FaPlus 
         onClick={openFileHandler}
          className={clsx('icon hover:scale-[1.5]',
            openFile?'rotate-[360deg] ease-in-out bg-green-600   duration-500 transition-all':'transition-all  rounded-full   rotate-[0deg] ease-in-out'
          )}
          />

        <MdEmojiEmotions 
          
          onClick={ShowEmojiHandler}
           className={clsx('icon hover:text-yellow-500 hover:scale-[1.5]',

           )}
        />

         <div className={clsx(' absolute bottom-[100px]',
          showEmoji?'block':"hidden"
         )}>
            <EmojiItems/>
         </div>
         
        
       
        <div className='w-full '>
         <SendMessageForm/>
        
        </div>
        
       <div ref={closeItem} className={clsx('absolute z-10  bg-white rounded-md',
        openFile?'bottom-[100px] duration-300 ease-in':'bottom-[0px] duration-300 ease-in-out  invisible'
       )}>
        
         <UploadFiles/>
       </div>
        
    </div>
  )
}
