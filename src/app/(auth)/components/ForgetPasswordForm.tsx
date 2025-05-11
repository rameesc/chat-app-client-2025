'use client'


import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import AuthCardItem from './AuthCardItem'
import { Form } from '@/components/ui/form'
import { CustomInput } from '@/components/Input/CustomInput'
import { LoadingButton } from '@/components/Button/LoadingButton'
import { ShowErrorMessage } from '@/components/Error/ShowErrorMessage'
import { forgetPasswordValidation } from '@/schema'
import { useQueryForgetPassword } from '@/hooks/useQueryAuth'
export const ForgetPasswordForm = () => {

    

    const form=useForm<z.infer<typeof forgetPasswordValidation>>({
        resolver:zodResolver(forgetPasswordValidation),
        defaultValues:({
            email:''
        })
    })
   

    const {mutate,isPending,data}=useQueryForgetPassword()

    const onSubmitHandler=(values:z.infer<typeof forgetPasswordValidation>)=>{

        mutate(values)
    }

  return (
   <AuthCardItem
    title='Forget Password'
  
    link='/login'
    linkText='Login'
    linkDescription="You alrady have account PLEASE CLICK HERE"

   >
      <Form {...form}>
        <form className=' space-y-3' onSubmit={form.handleSubmit(onSubmitHandler)}>

           {data?.message &&
            <ShowErrorMessage
             message={data?.message}
             status={data?.status}
            />
            }

        <CustomInput
            control={form.control}
            disabled={isPending}
            label='Email'
            name='email'
            type={'text'}
            placeHolder='Enter you Email'
        
          />
          <LoadingButton
            type='submit'
            title='submit'
            disabled={isPending}

            
          />
        </form>

      </Form>
   </AuthCardItem>
  )
}
