'use client'

import { FilePopap } from '@/components/popap/FilePopap'
import { S3BUCKET_IMG_URL } from '@/config'
import {  ContectType } from '@/type/type'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useState } from 'react'


type  ChatImageItemProps={
    contactType:ContectType
    contact:string
}
export const ChatImageItem = ({contactType,contact}:ChatImageItemProps) => {
  const [openImage,setOpenImage]=useState(false)

  const [scale,setScale]=useState(1.1)

  const openImageHandler=()=>{
    setOpenImage(true)
  }
  const closeOpenImage=()=>{
    setOpenImage(false)
  }

  const zoomHandler=(e:React.WheelEvent)=>{
    e.preventDefault()
    const delta=e.deltaY > 0 ? 0.8 :1.1;
    const newScale = Math.max(0.1, Math.min(scale * delta ,5))

    setScale(newScale)
    console.log(newScale,'new')

   console.log(e)

  }
  return (
         <div className={clsx('flex flex-col',
            contactType!=='image'&&'hidden'
         )}>
          <Image
            onClick={openImageHandler}
            src={`${S3BUCKET_IMG_URL}/${contact}`}
            alt='img'
            width={200}
            height={200}
            className={clsx('rounded-md mt-5 cursor-pointer',
            contactType!=='image'&&'hidden'
        
           )}
       
           />
          {openImage && ( 
            <FilePopap
              closeHandler={closeOpenImage}
            >

               <Image
                onWheel={(e)=>zoomHandler(e)}
                src={`${S3BUCKET_IMG_URL}/${contact}`}
                alt='img'
                width={200}
                height={200}
                className={clsx('rounded-md mt-5 cursor-pointer w-[400px] object-contain  ',
                contactType!=='image'&&'hidden'
                
        
                )}
                style={{transform:`scale(${scale})  rotate(0deg)`}}
       
              />
           </FilePopap>
           )}
      </div>
  
  )
}
