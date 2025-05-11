'use client'

import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import clsx from 'clsx'

type  ClientLogoutButtonProps={
    style?:string
}
export const ClientLogoutButton = ({style}:ClientLogoutButtonProps) => {
  return (
    <Button 
     onClick={()=>signOut()}
     className={clsx(' cursor-pointer',
        style && style
     )}
     >
        Log-Out
    </Button>
  )
}
