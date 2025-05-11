'use client'

import { resetPasswordValidation } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import AuthCardItem from './AuthCardItem'
import { ShowErrorMessage } from '@/components/Error/ShowErrorMessage'


import { LoadingButton } from '@/components/Button/LoadingButton'
import { useQueryResetPassword } from '@/hooks/useQueryAuth'
import { useRouter, useSearchParams } from 'next/navigation'

import { PasswordInput } from '@/components/Input/PasswordInput'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

export const ResetPasswordForm = () => {
    const search=useSearchParams()

    const router=useRouter()

   
    const token=search.get("token")

    const form= useForm<z.infer<typeof resetPasswordValidation>>({
        resolver:zodResolver(resetPasswordValidation),
        defaultValues:({
            password:'',
            conformPassword:'',
           
        })
    })

    const {mutate,isPending,data}=useQueryResetPassword()


    const onSubmitHandler=(values:z.infer<typeof resetPasswordValidation>)=>{

        mutate({token:token as string ,password:values.password})
    
    }
  return (
    <AuthCardItem
     title='Reset Your Password'
     link='/login'
     linkText='Login'
     linkDescription="You alrady have account PLEASE CLICK HERE"
   >

    <Form {...form}>



      <form 
        className='space-y-5 mt-5'
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
            
         {data &&<ShowErrorMessage
            message={data?.message}
            status={data?.status}
          />
          }

          

          
            <PasswordInput
              control={form.control}
              disabled={isPending}
              label='Password'
              name='password'
              type={'text'}
              placeHolder='Enter you Password'
            />
             <PasswordInput
               control={form.control}
               disabled={isPending}
               label='reEnter Password'
               name='conformPassword'
               type={'text'}
               placeHolder='Enter you Password'
           />
          
           <div className='flex gap-2'>
            <LoadingButton
             type='submit'
             title='submit'
             disabled={isPending}

            
            />
            <Button onClick={()=>router.push('/login')} type='button'>Go to login</Button>

            
            

           </div>
          
          
      </form>

    </Form>

   </AuthCardItem>
  )
}
