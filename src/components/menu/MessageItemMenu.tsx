'use client'

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
   
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CiMenuKebab } from 'react-icons/ci'
import { useStore } from '@/hooks/useStore'

  type MessageItemMenuProps={
    itemdeleteId:string,
    copyMessageValue:()=>void
  }
export const MessageItemMenu = ({itemdeleteId,copyMessageValue}:MessageItemMenuProps) => {

    const {setDeleteMessage,setMessageDeleteId}=useStore()

    const deleteMessage=()=>{
        
        setMessageDeleteId(itemdeleteId)
        setDeleteMessage(true)

    }
    const copyMessage=async()=>{
        
      copyMessageValue()

    }
    
  return (
    <DropdownMenu>
     <DropdownMenuTrigger className=' outline-none cursor-pointer'>
        <CiMenuKebab
          size={18}
          className='rotate-[90deg] cursor-pointer'
         /> 
     </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white'>
      
       
       <DropdownMenuItem onClick={deleteMessage}>Delete</DropdownMenuItem>
       <DropdownMenuItem onClick={copyMessage}>Copy</DropdownMenuItem>
       
      </DropdownMenuContent>
   </DropdownMenu>

  )
}
