'use client'


import { copyToClickBoad, itMeUser } from '@/helper'
import { timeFormatted } from '@/helper/dateFormatted'

import { useUserInformation } from '@/hooks/useUserInformation'
import { ContectType, UserType } from '@/type/type'
import clsx from 'clsx'

import React, { useMemo} from 'react'

import { MessageItemMenu } from '../menu/MessageItemMenu'

import { AudioContact } from './audio/AudioContact'
import { ChatImageItem } from './chat-image/ChatImageItem'
import { ChatVideoContact } from './chat-videoc-contact/ChatVideoContact'

type ChatContactProsp={
    sender:UserType,
    messageId:string,
    date:string,
    contact:string,
    contactType: ContectType
    lastMessageId?:string
}

export const ChatContact = ({sender,messageId,date,contact,contactType}:ChatContactProsp) => {

     const userData=useUserInformation()
     

    const itMe=userData?.user?.id?.toString() as string
    // const senderId=sender?._id?.toString()

    const textArray=  ['text','delete']

    const deleteType=useMemo(()=>{
      if(contactType=='delete'){
        return true
      }
      return false

    },[contactType])

   
    const senderId=useMemo(()=>{
   
      return sender?._id?.toString()

    },[sender?._id])

  

  return (
    <div  className={clsx('p-2 rounded-xl',
     itMeUser(itMe,senderId)  ?"bg-[#427952]  self-end ":"bg-white self-start "
      
    )}>

     <div className={clsx('flex gap-2 items-center',
          itMeUser(itMe,senderId) ?"text-white ":"text-v-grayText "
      )}>
         
        {!deleteType &&(
          <MessageItemMenu
           itemdeleteId={messageId}
           copyMessageValue={()=>copyToClickBoad(contact)}
          />

        )} 

        <div className='flex gap-2 text-sm'>
            <p>{sender?.userName}</p>
            {date &&<p>{timeFormatted(date)}</p>}
        </div>
     </div>

     {/* text */}
     <p className={clsx('max-w-[200px] break-words',
      deleteType && 'text-v-grayText ',
      textArray.includes(contactType) ?'block':"hidden"
     )}>{contact}</p>
     

     {/* iamge */}
     {contactType=='image' && (
      <ChatImageItem
      contactType='image'
      contact={contact}
     />

     )}
     
     {/* videoc contect */}
     {contactType=="video" &&
      <ChatVideoContact
        contact={contact}
      />
      }

    {/* audio */}
    <AudioContact
      contactType={contactType}
      contact={contact}
      sender={sender}
    />


    </div>
  )
}
