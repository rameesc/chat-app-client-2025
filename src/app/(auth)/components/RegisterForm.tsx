'use client'


import { registerValidation } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import AuthCardItem from './AuthCardItem'
import { Form} from '@/components/ui/form'


import { LoadingButton } from '@/components/Button/LoadingButton'
import { CustomInput } from '@/components/Input/CustomInput'
import { PasswordInput } from '@/components/Input/PasswordInput'
import { ShowErrorMessage } from '@/components/Error/ShowErrorMessage'
import { useQueryRegister } from '@/hooks/useQueryAuth'

export const RegisterForm = () => {


  const {data,isPending,mutate}=useQueryRegister()

    const form= useForm<z.infer<typeof registerValidation>>({
        resolver:zodResolver(registerValidation),
        defaultValues:({
            password:'',
            email:"",
            conformPassword:'',
            userName:''
        })
    })


    const onSubmitHandler=(values:z.infer<typeof registerValidation>)=>{
    

        mutate(values)
        
      

     
    }
  return (
   <AuthCardItem
     title='Register'
     link='/login'
     linkText='Login'
     linkDescription="You alrady have account PLEASE CLICK HERE"
   >

    <Form {...form}>



      <form 
        className=' space-y-5'
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
            
         {data &&<ShowErrorMessage
            message={data?.message}
            status={data?.status}
          />
          }

          <CustomInput
            control={form.control}
            disabled={isPending}
            label='User Name'
            name='userName'
            type={'text'}
            placeHolder='Enter you user name'
        
          />
           <CustomInput
            control={form.control}
            disabled={isPending}
            label='Email'
            name='email'
            type={'text'}
            placeHolder='Enter you Email'
        
          />
          <PasswordInput
              control={form.control}
              disabled={isPending}
              label='Password'
              name='password'
             
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
