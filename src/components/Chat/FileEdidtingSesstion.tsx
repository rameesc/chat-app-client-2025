'use client'

import { useStore } from '@/hooks/useStore'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

import { MdDelete } from "react-icons/md";

import { SendButton } from '../Button/SendButton'
import { Files } from '@/type/type'
import { useQuerySendFiles } from '@/hooks/useQueryMessage'
export const FileEdidtingSesstion = () => {

   
    const {files,setFiles,setDeleteFile,selectChat}=useStore()
    const [currentImage,setCurrentImage]=useState<Files>(files[0])

    const {isPending,mutate}= useQuerySendFiles()
    
    const currentImg=useMemo(()=>{
       
       
        return currentImage.url

    },[currentImage])

    // const currentImg=files[0].url

    const closeImageHandler=()=>{
      setFiles([])
    }
   
   

    const deleteImage=()=>{
       

        if(files.length==1){
            setFiles([])
           return 
        }
      
       
        setCurrentImage(files[files.length-1])
        setDeleteFile(currentImage.url)
           
        
      

    }

    const uploadImageToChat=()=>{

      const formData = new FormData()
      formData.append("conversationId",selectChat)
      
      files.map((file)=>{
         formData.append("files",file?.file)
       
      })

      mutate(formData)
    

    }

    
  return (
    <div className='flex justify-between flex-col h-[80%]'>
        <div className='p-2 flex gap-5 items-center '>
            <div onClick={closeImageHandler}>
              <p  className='text-[25px] font-bold text-red-600 cursor-pointer'>x</p>
            </div>
             
             <div onClick={deleteImage}>
              <MdDelete 
                className='icon scale-[1.2]'
              />
             </div>
        </div>
        <div className='flex flex-col h-full items-center justify-center overflow-hidden  p-2'>
               <Image
                  src={currentImg}
                  alt='img'
                  width={400}
                  height={200}
                  className={clsx('rounded-md  object-contain ',
                      currentImage?.file?.type.split('/')[0]=='video' && 'hidden'
                  )}
                />
                <video  controls className={clsx('w-[200px] h-[300px] object-contain',
                     currentImage?.file?.type.split('/')[0]=='image' && 'hidden'
                 )} src={currentImage?.url}></video>
              

        </div>
        <div className='flex flex-row  justify-between p-3 gap-5 border-1 border-v-borderColor'>
            <div className='flex gap-2'>
             {files.map((file,index)=>(
                <>
                 <Image
                  key={index+'img'}
                  onClick={()=>setCurrentImage(file)}
                  src={file.url}
                  alt='img'
                  width={50}
                  height={50}
                  className={clsx('rounded-md',
                   currentImage.url==file.url &&"border-3 border-green-600",
                    file?.file?.type.split('/')[0]!=='image' && 'hidden'
                  )}
                 />

                 <video  
                 onClick={()=>setCurrentImage(file)} 
                  className={clsx('w-[50px] h-[50px]',
                    currentImage.url==file.url &&"border-3 border-green-600",
                     file?.file?.type.split('/')[0]=='image' && 'hidden'
                 )} src={file?.url}></video>
               </>
             ))}
            </div>
            <SendButton
              sendImage={uploadImageToChat}
              
             disabled={isPending}
            />

        </div>
    </div>
  )
}
