'use client'

import { ChildrenType } from '@/type/type'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export const AuthSessionProvider = ({children}:ChildrenType) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
