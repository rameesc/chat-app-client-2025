'use client'


import { UserAvatar } from '@/components/Chat/UserAvatar'
import { UserNameOrGroupName } from '@/components/Chat/UserNameOrGroupName'
import { useStore } from '@/hooks/useStore'
import clsx from 'clsx'
import React from 'react'
import { TiTick } from 'react-icons/ti'

type UserList={
    userId:string,
    userName:string,
    image:string
}
export const AddUserToGroupList = ({userId,userName,image}:UserList) => {
   
     const {selectedUser,setSeletedUser}=useStore()

    const addTouserSelectList=(userId:string ,userName:string)=>{

        const userData={
            userId,
            userName
        }
      
       setSeletedUser(userData)
   
      }

      const isSelectedUserOrNot=(userId:string)=>{
        return selectedUser.some((userData)=>userData.userId==userId)
       }

  return (
    <div 
     onClick={()=>addTouserSelectList(userId,userName)} 
     
     className={clsx('flex p-1 hover:bg-green-200 cursor-pointer justify-between items-center gap-1',
     isSelectedUserOrNot(userId) &&'bg-green-200'
     )}>
        <div className='flex gap-2'>
            <UserAvatar
             image={image}
                     
                     
         />
            <UserNameOrGroupName
             name={userName}
                    
            />
        </div>
        <div>
            {isSelectedUserOrNot(userId) &&(
                <TiTick
                size={22}
                color='green'
                />
            )}
        </div>
                    
    </div>
  )
}
