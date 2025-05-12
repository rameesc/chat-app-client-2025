'use client'



import { CustomUploadImage } from '@/components/Input/CustomUploadImage'
import { Form } from '@/components/ui/form'

import { groupValidation } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {z} from 'zod'
import { UploadGroupImage } from './UploadGroupImage'
import { CustomInput } from '@/components/Input/CustomInput'
import { Button } from '@/components/ui/button'
import { SiTicktick } from 'react-icons/si'
import { useStore } from '@/hooks/useStore'
import { useQueryCreateConvesation } from '@/hooks/useQueryConversation'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useUserInformation } from '@/hooks/useUserInformation'


export const GroupFrom = () => {

  const {finalEditingImage,selectedUser,}=useStore()

  const user=useUserInformation()

  const {mutate,isPending}=useQueryCreateConvesation()

    const form=useForm<z.infer<typeof groupValidation>>({
        resolver:zodResolver(groupValidation),
        defaultValues:({
            file:{
            
            },
            name:''

        })
    })

    const onSubmitHandler=(value:z.infer<typeof groupValidation>)=>{

        if(value.file==null||!value?.file){
            return toast.error('upload file')
        }

        //It,s auth user data
        const authUser={
          userId:user?.user?.id,
          userName:user?.user?.name
        }

        const formData = new FormData()
    

        formData.append('type','group')
        formData.append('groupName',value?.name)
        
        formData.append('files',finalEditingImage as File)
        const userIds=[...selectedUser,authUser]

       
        userIds.map((u)=>{
          formData.append('participants',u?.userId as string)
        })

        mutate(formData)

        

    }

  return (
    <div>
        <Form {...form}>
        <form 
          className=' space-y-3'
          onSubmit={form.handleSubmit(onSubmitHandler)}
         >
           
            
            <CustomUploadImage
             name={'file'}
             >
                <UploadGroupImage/>
            </CustomUploadImage>

            <CustomInput 
              name={'name'}
              control={form.control}
              label='Group Name'
              placeHolder='Add group Name'

             />
             
           <div className='flex flex-col  mt-10'>
            <Button
             disabled={isPending}
             type='submit'
             className="bg-[#136d10] hover:bg-[#136d10e7]"
            >
              {isPending ?(
                <LoadingSpinner
                size={20}
                color=''
                />
              ):(
                <SiTicktick
                size={25}
                />

              )}
             
              
            </Button>
           </div>
        </form>
     </Form>
    </div>
  )
}
