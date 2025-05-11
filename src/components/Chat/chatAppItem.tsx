'use client'
import React, { useEffect } from 'react'
import { ChatContactList } from './ChatContactList'
import { ChatConversation } from './ChatConversation'
import { ChatTopNavbar } from './ChatTopNavbar'
import { useStore } from '@/hooks/useStore'
import { SearchContactUser } from './SearchContactUser'
import { NoSelectChat } from './NoSelectChat'

import { CustomPopap } from '../popap/CustomPopap'
import { ConformationItem } from '../ConformationItem'

import { useQueryDeleteMessage } from '@/hooks/useQueryMessage'
import { AddNewGroup } from './AddNewGroup'
import clsx from 'clsx'
import { useSocket } from '@/hooks/useSocket'
import { useUserInformation } from '@/hooks/useUserInformation'






export const ChatAppItems = () => {
  const {openSearchBar,selectChat,deleteMessage,setDeleteMessage,messageDeleteId}=useStore()
  const {mutate,isPending}=useQueryDeleteMessage()
  
 const socket =useSocket()
 const userData =useUserInformation()
  

useEffect(()=>{
  if(!socket) return
  socket.emit("onlien-user",userData?.user?.id)

},[socket,userData])

  const closeDeleteOption=()=>{
    setDeleteMessage(false)
  }


  const messageDeleteHandler=()=>{
    if(messageDeleteId==null) return

    mutate(messageDeleteId)
  }

  
  
  return (
     <div className='flex  gap-[30px]  w-[100%] h-full  p-5 '>
      
       
     

      {openSearchBar?(
        <SearchContactUser/> 
      ):(

    
          
       <div className={clsx(' flex-col w-[100%] md:w-[400px]  h-[100%] ',
          selectChat ? 'hidden md:flex':'flex'
       )}>
        
           <ChatTopNavbar/>
           <AddNewGroup/>
          
            <ChatContactList/>
        
       </div>
     
      )} 
       
        
   
      {selectChat?(
     
           <ChatConversation/>
          
      ):(
        <NoSelectChat/>
      )} 
      {deleteMessage &&(
        <CustomPopap
         closeHandler={()=>closeDeleteOption()}
         open={deleteMessage}
        >
          <ConformationItem
             description='Do you want to delete this message?'
             btnText='Delete Anyway'
             disabled={isPending}
            action={()=>messageDeleteHandler()}
            close={()=>closeDeleteOption()}
          />
        </CustomPopap>

      )}

      
     
     </div>
  )
}
