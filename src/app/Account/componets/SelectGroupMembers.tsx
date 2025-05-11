'use client'

import { DataNotFound } from '@/components/Chat/DataNotFound'
import { UserAvatar } from '@/components/Chat/UserAvatar'
import { UserNameOrGroupName } from '@/components/Chat/UserNameOrGroupName'
import { UserSkeltone } from '@/components/Skeltone/userSkeltone'
import { isSelectedGroupMembers } from '@/helper'
import { useQuerSingleConversation, useQueryAddNewMembers } from '@/hooks/useQueryConversation'
import { useQueryUserContactList } from '@/hooks/useQueryUser'
import { useUserInformation } from '@/hooks/useUserInformation'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { AddToGroup } from './AddToGroup'

type SelectGroupMembersProsp={
    closeMembersPopap:()=>void
}

export const SelectGroupMembers = ({closeMembersPopap}:SelectGroupMembersProsp) => {

    const user=useUserInformation()
    const authUserId=user?.user?.id as string
    const {refetch,isPending,data}=useQueryUserContactList(authUserId)

    const {isPending:AddPending,mutate:AddMutate}=useQueryAddNewMembers()
    const [selectedUser,setSelectedUser]=useState<string[]|[]>([])

    const {isPending:groupPending ,data:groupData}=useQuerSingleConversation()

    useEffect(()=>{
        refetch()

    },[data])

    const userContactArray=useMemo(()=>{

        return groupData?.participants?.map((user)=>user?._id)||[]
 
     },[groupData?.participants])

     const selectedNewMembersToGroup=(userId:string)=>{

        
        if(selectedUser.some((id)=>id==userId)){
           
            setSelectedUser(selectedUser.filter((id)=>id!==userId))
            return
        }

        setSelectedUser((pre)=>[...pre,userId])

       

     }


     const addToGroupNewMembersHandler=()=>{
        AddMutate({userIds:selectedUser})
        
        closeMembersPopap()

     }

   

    if(isPending||groupPending){
        return <div className='bg-white w-[100%] p-2 lg:w-[500px] rounded-md'>
                  <UserSkeltone/>
                  <UserSkeltone/>
                  <UserSkeltone/>
                </div>
    }
    if(data?.contact?.contacts.length==0){
        return <div className='bg-white w-[100%] p-2 lg:w-[500px] rounded-md'>
                  <DataNotFound
                   title='No User List found !'
                  />
                </div>
    }

   
   
  return (
    <div className='bg-white w-full p-2 lg:w-[500px] rounded-md'>

        <div className='w-full flex flex-col  gap-3'>
            {data?.contact?.contacts?.map((user)=>(
                <div
                  onClick={()=>{
                    if(isSelectedGroupMembers(userContactArray,user?._id)) return

                    selectedNewMembersToGroup(user?._id)
                  }}

                  key={user?._id}

                  className={clsx('flex gap-2 items-center',
                    isSelectedGroupMembers(userContactArray,user?._id)?' opacity-[0.4]':' opacity-[1] cursor-pointer',
                    isSelectedGroupMembers(selectedUser,user?._id)?'bg-[#1edf7eaf] p-2 rounded-md':''
                 )}
                >
                    <div className='flex gap-2'>
                     <UserAvatar
                      image={user?.picture}
                     />
                     <UserNameOrGroupName
                      name={user?.userName}
                     />

                    </div>
                   
                    <div>
                        {isSelectedGroupMembers(userContactArray,user?._id) &&(
                            <p className='text-red-600'>Already</p>
                        )}
                    </div>


                   
                </div>
            ))}
        </div>
        <div className={clsx('',
            selectedUser.length>0 ?'block':"hidden"
        )}>
          <AddToGroup
           action={addToGroupNewMembersHandler}
           disabled={AddPending}
          
          />

        </div>
         
       
    </div>
  )
}
