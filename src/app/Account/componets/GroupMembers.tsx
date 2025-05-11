'use client'


import { UserAvatar } from '@/components/Chat/UserAvatar'
import { UserNameOrGroupName } from '@/components/Chat/UserNameOrGroupName'
import { itMeUser } from '@/helper'
import { useUserInformation } from '@/hooks/useUserInformation'

import React, { useMemo } from 'react'
import { GroupMenu } from './GroupMenu'


type GroupMembersProsp={
    userName:string,
    image?:string,
    userId:string,
    groupAdmin:string[]
}
export const GroupMembers = ({userId,userName,image,groupAdmin}:GroupMembersProsp) => {
    const authUser=useUserInformation()
    const authUserId=authUser?.user?.id as string

    

    // if(authUser?.status=='loading'){
    //     return <div>loading</div>
    // }

    const groupAdminUser=useMemo(()=>{

       return groupAdmin.includes(userId)

    },[groupAdmin,userId])

    
   const authUserAdmin=useMemo(()=>{
     return groupAdmin.includes(authUserId)

     

   },[groupAdmin,authUserId])
    
  return (
    <div
    className='flex   justify-between items-center hover:bg-green-200 p-1 cursor-pointer' 
   >
       <div className='flex items-center gap-3  '>
        <UserAvatar
        image={image}
        />
        <UserNameOrGroupName
         name={ itMeUser(authUserId,userId)?'You': userName}
         
         />
       

       </div>
         
        

        <div className='flex gap-2  items-center'>
         {groupAdminUser  && (
            <div className='flex gap-2'>
                <span className=' font-[400] border-1 border-green-700 px-2 text-green-700 text-[15px] rounded-md'>Admin</span>
                
            </div>
            
          )}
         { authUserAdmin && !itMeUser(authUserId,userId) &&(
            
             <GroupMenu
               userId={userId}
              groupAdminUser={groupAdminUser}
             />
            
            
          )}
         

        </div>
       

         
   </div>
  )
}
