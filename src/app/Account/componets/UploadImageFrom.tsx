'use client'


import { LoadingButton } from '@/components/Button/LoadingButton'
import { ShowErrorMessage } from '@/components/Error/ShowErrorMessage'
import { images } from '@/components/images'

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useQueryProfileChange } from '@/hooks/useQueryUser'
import { uploadFile } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {z} from 'zod'

type UploadFileError={
    message:string |null,
    status:boolean
}
type  UploadImageFromProps={
    maxSizeMB:number,
    email?:string
}
export const UploadImageFrom = ({maxSizeMB}:UploadImageFromProps) => {

   const [imagesError,setImageError]=useState<UploadFileError>({
    message:null,
    status:true
   })

   const [filePreview,setFilePreview]=useState<string|null>(null)

   const {mutate,isPending}=useQueryProfileChange()
    
  
    const form=useForm<z.infer<typeof uploadFile>>({
        resolver:zodResolver(uploadFile),
        defaultValues:({
            file:{
            
            }
        })
    })

    const onSubmitHandler=async(value:z.infer<typeof uploadFile>)=>{

        if(value.file==null||!value?.file){
            return toast.error('upload file')
        }

       const formData=new FormData()
       formData.append("pic",value?.file)
       

       mutate({formData})

       
      
       

    }

    const uploadFileHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{

          const file=e.target.files?.[0]
         
          const type = file?.type.split('/')[0]
          if(!file){
            setFilePreview(null)
             return setImageError({
                message:'Upload File , File is Emty',
                status:false
             })

          }
          
          if(maxSizeMB && file.size > maxSizeMB *1024*1024){
            return setImageError({
                message:`File size must be less then ${maxSizeMB} MB`,
                status:false
             })

          }
          if(type && !type.includes('image')){
            return setImageError({
                message:`You can only upload image file`,
                status:false
             })

          }

          setFilePreview(URL.createObjectURL(file))

         
          setImageError({
            message:null,
            status:true
         })

       

      
          return file


    }

    useEffect(()=>{

      if(!isPending){

        form.reset({})
       setFilePreview(null)
        
      }

    },[isPending,setFilePreview,filePreview])

  return (
    <div className='bg-white p-5 rounded-md w-[90%] lg:w-[400px] '>

    
     <Form {...form} >
        <form 
          className=' space-y-3'
          onSubmit={form.handleSubmit(onSubmitHandler)}
         >
           {imagesError?.message!==null &&(
            <ShowErrorMessage
             message={imagesError?.message}
             status={imagesError?.status}
            />

           )} 
            <FormField
              control={form.control}
              name='file'
              render={({field})=>(
                <FormItem>
                  
                    <FormLabel
                     htmlFor='img'
                     className='flex flex-col gap-1' 
                    >
                        <Image
                          src={
                            filePreview!==null ?(filePreview):(images?.upload)
                            }
                          alt='img'
                          width={100}
                          height={100}
                          className=' rounded-md w-[200px] h-[200px]'

                        />
                        <Input 
                        
                          id='img'
                          type='file' 
                          hidden
                          onChange={(e)=>{
                           const file= uploadFileHandler(e)
                            field.onChange(file)
                          }}
                          
                        />
                        <FormMessage/>
                    </FormLabel>
                 


                </FormItem>
              )}
            />
            <LoadingButton
              title='Upload Image'
              type='submit'
              disabled={isPending}
            />
        </form>
     </Form>
    </div>
  )
}
