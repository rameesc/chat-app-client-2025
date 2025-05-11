'use client'


import React from 'react'
import { ClipLoader } from 'react-spinners'

type LoadingSpinnerType={
    color:string,
    size:number
}
export const LoadingSpinner = ({color,size}:LoadingSpinnerType) => {
  return (
        <ClipLoader
          color={color}
          size={size}
         
        />
 
  )
}
