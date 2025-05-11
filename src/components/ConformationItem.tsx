'use client'


import React from 'react'
import { Button } from './ui/button'
import { CustomButtom } from './Button/CustomButtom'


type ConformationItemProps={
    close:()=>void,
    action:()=>void,
    description:string,
    btnText:string,
    disabled?:boolean
}

export const ConformationItem = ({close,action,description,btnText, disabled}:ConformationItemProps) => {
  return (
    <div className='p-5 m-2 bg-white rounded-md flex flex-col gap-2'>
        <p className='text-[18px]'>{description}</p>
        <div className='flex gap-2 mt-10'>
            <Button onClick={close}>Cancel</Button>
            <CustomButtom
              disabled={disabled}
               action={action}
               title={btnText}
               color='bg-red-500 hover:bg-red-600'
            />
           
        </div>
    </div>
  )
}
