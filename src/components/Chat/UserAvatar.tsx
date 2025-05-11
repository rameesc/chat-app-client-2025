'use client'


import Image from 'next/image'
import React from 'react'
import { images } from '../images'
import clsx from 'clsx'
import { S3BUCKET_IMG_URL } from '@/config'
import { useStore } from '@/hooks/useStore'

type UserAvatarProsp={
    style?:string,
    image?:string,
    userId?:string

}
export const UserAvatar = ({style,image,userId}:UserAvatarProsp) => {

  const {onlineUserList}=useStore()

  const domainName=image?.split('/')[2]
  return (
    <div className='w-[50px] relative'>
      
        {process.env.NEXT_PUBLIC_GOOGLE_IMG_DOMAIN==domainName ?(
          <Image 
           src={image?image:images.user}
           width={50}
           height={50}
           alt='img'
           className={clsx('',
            style ? style :'rounded-full w-[50px] h-[50px]'
                

            )}
         />
        ):(
          <Image
           src={image ? `${S3BUCKET_IMG_URL}/${image}` :images.user}
           width={50}
           height={50}
           alt='img'
           className={clsx('',
            style ? style:'rounded-full w-[50px] h-[50px]'
                

            )}
          />
        )} 
        
         <div className={clsx('w-[10px] h-[10px] bg-green-500  rounded-full absolute top-[10px] right-0',
          onlineUserList.some((user)=>user?.userId==userId) ?"block":"hidden"
         )}/>
      
       
        
    </div>
  )
}
