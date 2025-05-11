'use client'

import { S3BUCKET_IMG_URL } from '@/config'
import clsx from 'clsx'
import React from 'react'

type ChatVideoContactProps={
    contact:string
}
export const ChatVideoContact = ({contact}:ChatVideoContactProps) => {
  return (
    <div>
        <video  controls className={clsx('w-[200px] h-[300px] object-fill')} 
          src={`${S3BUCKET_IMG_URL}/${contact}`}></video>
    </div>
  )
}
