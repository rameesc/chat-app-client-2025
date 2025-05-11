'use client'

import { images } from '@/components/images'
import { isBucketImageOrNot } from '@/helper'
import { useStore } from '@/hooks/useStore'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type ShowImageProsp={
    image?:string,
    style?:string
}
export const ShowImage = ({image}:ShowImageProsp) => {
    const {showPopap}=useStore()
   
  return (
    <div>
      
        <Image
           src={image?isBucketImageOrNot(image):images.user }
           alt='img'
           width={50}
           height={50}
           
           className={clsx(' object-cover',
            showPopap ? 'w-[200px] h-[200px] ease-in  duration-300': ' ease-in-out duration-300 w-[150px] h-[150px] rounded-full'
           
           )}
         />
    </div>
  )
}
