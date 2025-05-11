'use client'


import { loginValidation } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import AuthCardItem from './AuthCardItem'
import { Form } from '@/components/ui/form'


import { LoadingButton } from '@/components/Button/LoadingButton'
import { CustomInput } from '@/components/Input/CustomInput'

import { PasswordInput } from '@/components/Input/PasswordInput'
import { LoginWithGoogle } from './LoginWithGoogle'
import { Orline } from './Orline'
import { useQueryLogin } from '@/hooks/useQueryAuth'
import { ShowErrorMessage } from '@/components/Error/ShowErrorMessage'
import Link from 'next/link'

export const LoginForm = () => {



  

    const form= useForm<z.infer<typeof loginValidation>>({
        resolver:zodResolver(loginValidation),
        defaultValues:({
            password:'',
            email:""
        })
    })
    const {mutate,data,isPending}=useQueryLogin()

    const onSubmitHandler=(values:z.infer<typeof loginValidation>)=>{


     mutate(values)

     
    }
  return (
   <AuthCardItem
     title='Login'
     link='/register'
     linkText='Register'
     linkDescription="IF YOU DON'T HAVE ACCOUNT PLEASE CLICK HERE"
   >

    <Form {...form}>

      <form 
        className=' space-y-5'
        onSubmit={form.handleSubmit(onSubmitHandler)}


      >
          {data &&
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
          <div >
           <PasswordInput
             control={form.control}
             disabled={isPending}
            
            label='Password'
            name='password'
           
            placeHolder='Enter you Password'
           />
           <div className='w-[100%]  text-end'>
            <Link className='text-center text-[#107dd6]  ' href={'/forget-password'}>Forget Password?</Link>

           </div>
           
          

            
          </div>
         

         
         

          <LoadingButton
            type='submit'
            title='submit'
            disabled={isPending}

            
          />
          <Orline/>
          <LoginWithGoogle/>
          
      </form>

    </Form>

   </AuthCardItem>
  )
}
