'use client'

import React from 'react'
import { UserAvatar } from './UserAvatar'
import { UserNameOrGroupName } from './UserNameOrGroupName'
import { useQueryCreateConvesation } from '@/hooks/useQueryConversation'
import { useUserInformation } from '@/hooks/useUserInformation'

type SearchAccountUserProps={
    userId:string
    image:string,
    name:string,
  
  
  }
export const SearchAccountUser = ({userId,image,name}:SearchAccountUserProps) => {

    const {mutate}=useQueryCreateConvesation()

    const userData=useUserInformation()
    
    

    

    //if this user did,nt have conversation create conversation if have conversation go with that
    const goToConversationHandler=()=>{

      
       const participants:string[]=[
        userData?.user?.id?.toString() as string,
        userId
      ]
      const formData=new FormData()
      participants.map((u)=>(
        formData.append('participants',u)
      ))
      formData.append('type','private')
      
        
        mutate(formData)

    }

   
  return (
    <div 
     onClick={goToConversationHandler}
     className='flex justify-between cursor-pointer p-2 hover:bg-[#87bbeb5e] '>
      <div className='flex gap-3'>
        <UserAvatar
          image={image}
        />
        <UserNameOrGroupName
         name={name}
      
        />
       
       </div>
       

  </div>
  )
}
