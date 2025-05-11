'use client'


import React from 'react'
import { Button } from '../ui/button'
import { LoadingSpinner } from '../LoadingSpinner'
import clsx from 'clsx'

type LoadingButtonType={
    type:'button'|'submit'|'reset',
    title:string,
    color?:string,
    disabled?:boolean,
    
}
export const LoadingButton = ({type,title,color,disabled}:LoadingButtonType) => {
  
  return (
   <Button  disabled={disabled} type={type} className={clsx('flex gap-2',
    color && color
   )}>
     <span>{title}</span>
     {disabled &&
      <LoadingSpinner
       color='white'
       size={20}
      />
     }
   </Button>
  )
}
