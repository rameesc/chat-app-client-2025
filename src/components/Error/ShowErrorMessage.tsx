'use client'

import clsx from 'clsx'
import React from 'react'

type ShowErrorMessageProps={
    message:string | null,
    status:boolean
}
export const ShowErrorMessage = ({message,status}:ShowErrorMessageProps) => {
  return (
    <div className={clsx('p-2 border-1  rounded-md',
        status ?'border-[#85d889c5]':'border-[#eb7a7a]'
    )}>
        <p className={clsx('',
         status ?'text-[#136d18c5]':'text-[#e40d0d]'

        )}>{message}</p>
    </div>
  )
}
