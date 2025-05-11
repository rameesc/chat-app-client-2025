'use client'

import React from 'react'
import { ConversationRight } from './ConversationRight'
import { UserAvatar } from './UserAvatar'
import { UserNameOrGroupName } from './UserNameOrGroupName'
import { BackButton } from '../Button/BackButton'

type SingleChatPrivateProsp={
    action:()=>void,
    
    image:string,
    name:string,
    userNames?:string,
    backHandler:()=>void,
    isPrivate:boolean
    userId?:string
}
export const SingleChatPrivate = ({action,image,name,userNames,backHandler,isPrivate,userId}:SingleChatPrivateProsp) => {

 
  return (
    <div className='flex gap-3 justify-between border-b-2 p-2'>

          

          <div 
           
            className='flex gap-3 items-center cursor-pointer'>
            <div className=' block md:hidden'>
               <BackButton
                back={backHandler}
               />

            </div>
            <div 
              onClick={action}
             className='flex gap-2 '>
             <UserAvatar
              image={image as string}
             />
             <UserNameOrGroupName
             name={name as string}
             lastMessage={userNames}
       
             />

            </div>
            
            
          </div>
          <ConversationRight
            isPrivate={isPrivate}
            userId={userId as string}
          />

        </div>
  )
}
