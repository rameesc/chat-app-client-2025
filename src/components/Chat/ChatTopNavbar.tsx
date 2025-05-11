'use client'


import React from 'react'
import { UserNameOrGroupName } from './UserNameOrGroupName'
import { UserAvatar } from './UserAvatar'
import { SearchIcon } from './SearchIcon'
import { ChatMenuNavBar } from './ChatMenuNavBar'
import { useRouter } from 'next/navigation'
import { useUserInformation } from '@/hooks/useUserInformation'
import { UserSkeltone } from '../Skeltone/userSkeltone'

export const ChatTopNavbar = () => {

  const routet=useRouter()

  const user=useUserInformation()

  const data=useUserInformation()

  const moveToUserAccount=()=>{

    routet.push(`/Account/${user?.user?.id}?chat=private`)

  }

  if(data?.status=='loading'){

    <div>
      <UserSkeltone/>
    </div>
  }
  
  
  return (
    <div className='bg-white  p-3 rounded-t-md'>
        <div className='flex justify-between items-center   '>
         <div 
          onClick={moveToUserAccount}
          className='flex gap-3 cursor-pointer'>
            <UserAvatar
             image={data?.user?.image}
             />
            <UserNameOrGroupName
             name={data?.user?.name as string}
          
        
          />

         </div>
         
         <SearchIcon/>

        </div>
        <ChatMenuNavBar/> 
    </div>    
  )
}
