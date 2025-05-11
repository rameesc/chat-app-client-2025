
'use client'


import React from 'react'
import {signOut, useSession} from 'next-auth/react'

export const UserDate = () => {
    const {data}= useSession()
    
    
  return (
    <div>
        {JSON.stringify(data?.user)}
        <button onClick={()=>signOut()}>log out</button>
        
    </div>
  )
}
