'use client'

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useQueryAddAdminRole, useQueryRemoveFromGroup } from '@/hooks/useQueryConversation';
  
  type GroupMenuProsp={
    groupAdminUser:boolean,
    userId:string
  }
export const GroupMenu = ({groupAdminUser,userId}:GroupMenuProsp) => {

    const {isPending,mutate}=useQueryRemoveFromGroup()

    const {isPending:AddPending,mutate:AddMutate}=useQueryAddAdminRole()

    const removeFromGroup=()=>{
        mutate({userId})
    }
    const addAdminRole=()=>{
        AddMutate({userId})
    }
  return (
    <DropdownMenu  >
    <DropdownMenuTrigger className=' border-none outline-none'>
      <PiDotsThreeOutlineVerticalFill
        className=' cursor-pointer'
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent 
     
     side='left'>
      
      <DropdownMenuItem
        disabled={isPending||AddPending}
        onClick={removeFromGroup}
        >
        Remove 
     </DropdownMenuItem>

      {!groupAdminUser &&(
       <DropdownMenuItem
         onClick={addAdminRole}
        disabled={isPending}
       >
        Add admin Role
       </DropdownMenuItem>
      )}
     
      
    </DropdownMenuContent>
  </DropdownMenu>
  
  )
}
