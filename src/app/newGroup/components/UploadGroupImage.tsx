'use client'

import { images } from '@/components/images'
import { useStore } from '@/hooks/useStore'
import Image from 'next/image'
import React from 'react'

export const UploadGroupImage = () => {
  const {finalEditingImage}=useStore()
  return (
    <div className=' p-5 flex items-center justify-center flex-col'>
        <div className=' relative cursor-pointer'>
          <Image
            src={
              finalEditingImage?
               URL.createObjectURL(finalEditingImage):
              images?.group}
            alt='img'
            width={150}
            height={150}
            className=' rounded-full w-[150px] h-[150px]'
          />
          <div className=' absolute top-0  rounded-full w-[150px] h-[150px] hover:bg-[#29232385] bg-[#2923234f] flex items-center justify-center'>
             <p className='text-center text-white'>ADD GROUP PICTURE</p>
          </div>
        </div>
    </div>
  )
}
