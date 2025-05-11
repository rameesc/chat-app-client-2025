'use client'


import clsx from 'clsx'
import React from 'react'

type UserNameOrGroupNamePros={
      name:string,
      lastMessage?:string
      style?:string
}
export const UserNameOrGroupName = ({name,lastMessage,style}:UserNameOrGroupNamePros) => {
  return (
    <div className='flex flex-col  '>
        <p className={clsx(style ? style : 'font-bold text-[17px]')}>{name?name:'User'}</p>
        <p className='text-v-grayText'>{lastMessage? lastMessage: 'Account Info'}</p>
    </div>
  )
}
