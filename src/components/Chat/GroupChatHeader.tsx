'use client'


import React from 'react'
import { ConversationRight } from './ConversationRight'
import { UserAvatar } from './UserAvatar'
import { UserNameOrGroupName } from './UserNameOrGroupName'

type SingleChatPrivateProsp={
    action:()=>void,
    
    image:string,
    name:string,
    userNames?:string
}
export const GroupChatHeader = ({action,image,name,userNames}:SingleChatPrivateProsp) => {
  return (
    <div className='flex gap-3 justify-between border-b-2 p-2'>

    <div 
      onClick={action}
      className='flex gap-3 cursor-pointer'>
      <UserAvatar
       image={image as string}
      />
      <UserNameOrGroupName
       name={name as string}
       lastMessage={userNames}
 
      />
      
    </div>
    <ConversationRight/>

  </div>
  )
}
