'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
export const LoginWithGoogle = () => {

  const loginWithGoogleHandler=async()=>{

    await signIn("google",{
      redirectTo:'/'
    })

  }
  return (
    <>
  
     <Button type='button' onClick={loginWithGoogleHandler} className='bg-white  text-black border-1 cursor-pointer hover:bg-[#d1e1ec] border-v-borderColor w-[100%]'>
     <FcGoogle  size={40}/>
      <span className=''>Login With Google</span>
     </Button>
    </>
  )
}
