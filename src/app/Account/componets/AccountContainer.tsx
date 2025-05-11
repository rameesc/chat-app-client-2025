'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { GroupDetails } from './GroupDetails'
import { AccountDetails } from './AccountDetails'

export const AccountContainer = () => {
   const search=useSearchParams()
   const chat=search.get("chat")

  return (
    <div>
        {chat=='group'?(<GroupDetails/>):(<AccountDetails/>)}
    </div>
  )
  
}
