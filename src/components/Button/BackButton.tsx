'use client'

import React from 'react'

import { IoMdArrowBack } from 'react-icons/io'

type BackButtonProps={
    back:()=>void
}
export const BackButton = ({back}:BackButtonProps) => {
  return (
    <IoMdArrowBack 
      className=' cursor-pointer'
      onClick={back}
      size={23}/>
    // <Button 
    //  onClick={back}
    //  className=' cursor-pointer bg-white text-v-editeBg p-0 m-0'
    // >
    //         <IoMdArrowBack size={30}/>
           
    // </Button>
  )
}
