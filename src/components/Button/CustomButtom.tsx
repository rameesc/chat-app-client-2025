'use client'

import React from 'react'
import { Button } from '../ui/button'
import { LoadingSpinner } from '../LoadingSpinner'
import clsx from 'clsx'

type CustomButtomProps={
    disabled?:boolean,
    color?:string,
    title:string,
    action:()=>void
}
export const CustomButtom = ({disabled,color,title,action}:CustomButtomProps) => {
  return (
    <Button onClick={action}  disabled={disabled}  className={clsx('flex gap-2',
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
