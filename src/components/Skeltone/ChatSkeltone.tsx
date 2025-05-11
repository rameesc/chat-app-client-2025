'use client'

import React from 'react'
import { UserSkeltone } from './userSkeltone'
import { MessageSkeltone } from './MessageSkeltone'

export const ChatSkeltone = () => {
  return (
    <div className='layoutStyle p-5 overflow-hidden'>
       <div>
        <UserSkeltone/>
       </div>
       <div className='mt-5'>
          <MessageSkeltone/>
          <MessageSkeltone/>
          <MessageSkeltone/>
          <MessageSkeltone/>
          <MessageSkeltone/>
          <MessageSkeltone/>
       </div>
    </div>
  )
}
