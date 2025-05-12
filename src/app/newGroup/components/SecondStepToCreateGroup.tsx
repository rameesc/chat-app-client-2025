'use client'

import { BackButton } from '@/components/Button/BackButton'
import { useStore } from '@/hooks/useStore'
import React from 'react'

import { GroupFrom } from './UploadProfialPicture'
import { ImageEditing } from './ImageEditing'


export const SecondStepToCreateGroup = () => {

    const {setMoveToNext,openEditeSystem}=useStore()

    const backHandler=()=>{
        setMoveToNext(false)

    }
  return (
    <div className='flex flex-col gap-2 w-full'>
        <div className='flex gap-2 items-center'>
         <BackButton
          back={backHandler}

         />
         <div>
            <p className=' font-bold text-[18px]'>New Group</p>
         </div>

        

        </div>

        {/* <Image
          src={finalEditingImage?URL.createObjectURL(finalEditingImage):images?.user}
          alt='img'
          width={100}
          height={100}
          className='w-[50px] h-[50px]  bg-red-400'
          
        /> */}
        <GroupFrom/>
        {openEditeSystem && (
        
          <ImageEditing/>
       )}
       
    </div>
  )
}
