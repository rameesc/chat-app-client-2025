'use client'

import { DataNotFound } from '@/components/Chat/DataNotFound'

import { useQueryUserContactList } from '@/hooks/useQueryUser'

import React, { useEffect} from 'react'

import { AddUserToGroupList } from './AddUserToGroupList'

type UserContactUserType={
    userId:string
}
export const UserContactUser = ({userId}:UserContactUserType) => {
    const {data,isPending,refetch}=useQueryUserContactList(userId)
   

    useEffect(()=>{
        refetch()

    },[])

    if(isPending){
        return <div>loading</div>
    }

   if(data?.contact?.contacts?.length==0){
      return <DataNotFound/>
   }

   
   

  return (
    
        <div className='mt-2 flex flex-col gap-2'>
            {data?.contact?.contacts?.map((item,index)=>(
                <AddUserToGroupList
                 key={item?._id+index}
                 userId={item?._id}
                 userName={item?.userName}
                 image={item?.picture}
                />
            ))}

        </div>
   
  )
}
