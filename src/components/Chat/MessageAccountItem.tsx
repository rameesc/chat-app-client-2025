'use client'


import React, { useEffect, useMemo } from 'react'
import { UserAvatar } from './UserAvatar'
import { UserNameOrGroupName } from './UserNameOrGroupName'
import clsx from 'clsx'
import { timeDateFromatted } from '@/helper/dateFormatted'
import { useStore } from '@/hooks/useStore'
import { MessageType } from '@/type/type'
import { contactLenght } from '@/helper'
import { useResponsiveLength } from '@/hooks/useResponsiveLength'
import { useSocket } from '@/hooks/useSocket'
import { useUserInformation } from '@/hooks/useUserInformation'

type MessageAccountItemProps={
  conversationId:string
  image:string,
  name:string,
  lastMessage:MessageType,
  
  notification?:string
  thisUserId:string

}

export const MessageAccountItem = ({image,name,notification,conversationId,lastMessage,thisUserId}:MessageAccountItemProps) => {

  const {selectChat,setFiles,setSelectChat,setThisUser}=useStore()
  
const userData=useUserInformation()
  const socket =useSocket()

  useEffect(()=>{
    if(!socket) return

    socket.emit("onlien-user",userData?.user?.id)
    
  },[socket,userData])

  const length=useResponsiveLength(15,5,400)

  
  const selectChatHandler=()=>{
    
    setFiles([])
    setSelectChat(conversationId)
    setThisUser(thisUserId)

    
  
  }


  const lastMessageItem=useMemo(()=>{

    if(lastMessage?.contectType=='text'){
      return contactLenght(lastMessage?.contect,length) 
    }

    return lastMessage?.contectType

  },[lastMessage,length])

  const lastMessageDate=useMemo(()=>{

    return lastMessage?.createdAt

  },[lastMessage])
  return (
    <div 
      onClick={selectChatHandler} 
       className={clsx('flex justify-between cursor-pointer p-2 hover:bg-[#5152531a] ',
        conversationId==selectChat &&'bg-[#5152531a] rounded-md'
       )}>
        <div className='flex gap-3'>
          <UserAvatar
            image={image}
            userId={thisUserId}
          />
          <UserNameOrGroupName
           name={name}
           lastMessage={lastMessageItem}
        
          />

         </div>
         <div className='flex flex-col justify-center items-center gap-1'>
            {lastMessageDate &&<p className='text-v-grayText text-sm'>{timeDateFromatted(lastMessageDate)}</p>}
           <div className={clsx('w-[20px] h-[20px] bg-green-600 rounded-full flex justify-center items-center',
            notification=='0'?"hidden":'block'
           )}>
            <span className={clsx('text-[13px] text-white')}>{notification}</span>
           </div>
         </div>

    </div>
  )
}
