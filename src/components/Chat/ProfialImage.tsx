'use client'


import Image from 'next/image'
import React from 'react'
import { images } from '../images'
import clsx from 'clsx'

type ProfialImageType={
    image?:string
    style:string
}
export const ProfialImage = ({image,style}:ProfialImageType) => {
  return (
    <div>
        <Image
           src={image? image :images?.user}
           alt='img'
           width={50}
           height={50}
           className={clsx('',
            style ? style :'w-[150px] h-[150px] rounded-full '
           )}
         />
    </div>
  )
}
