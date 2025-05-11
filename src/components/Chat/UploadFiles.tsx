'use client'


import { uploadFileValidation } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'

import { Input } from '../ui/input'
import Image from 'next/image'
import { images } from '../images'

import {useStore} from "@/hooks/useStore"
import toast from 'react-hot-toast'

export const UploadFiles = () => {


    const {setFiles}=useStore()

    

    const form=useForm<z.infer<typeof uploadFileValidation>>({
        resolver:zodResolver(uploadFileValidation),
         defaultValues:({
            files:[]
         })
    })

    const onSubmitHandler=(values:z.infer<typeof uploadFileValidation>)=>{

        console.log(values,2000)
    }

    const uploadFilesHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{

        const files=e.target.files

        if(files==null&&!files){
          return  toast.error('Upload Files')
        }

        if(files.length>4){
            return  toast.error('only 4 files  can send')
        }

       const fileArray= Array.from(files)

      const value=fileArray.map((file)=>({
        file,
        url:URL.createObjectURL(file)
       }))

       setFiles(value)
       

       return value

       

       

    }
    console.log(form.watch('files'))
    
  return (
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FormField
              control={form.control}
              name='files'
              render={({field})=>(
                <FormItem>

                  <FormLabel htmlFor='img'  className='flex  items-start'>
                    <div className='flex items-center p-2 gap-2  cursor-pointer'>
                      <Image
                      src={images.upload}
                      alt='upload'
                       width={30}
                       height={30}
                       className=' cursor-pointer'
                       />
                        <p>Upload Img & Video</p>

                    </div>
                   
                   
                
                    <Input 
                      id='img'
                     className=''
                     type='file'
                    
                      multiple
                      hidden
                      onChange={(e)=>{
                       const value=uploadFilesHandler(e)

                       field.onChange(value)
                      }}
                    />
                    
                    


                  </FormLabel>
                  
                
                  

                </FormItem>
                
               
           
              )}
            />
            {/* <LoadingButton
              title='Send'
              type='submit'

            /> */}
        </form>
     </Form>
  )
}
