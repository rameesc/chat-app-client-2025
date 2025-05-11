'use client'

import { DataNotFound } from '@/components/Chat/DataNotFound'

import { useQuerySearchUser } from '@/hooks/useQueryUser'
import React from 'react'
import { AddUserToGroupList } from './AddUserToGroupList'

export const ChatSearchUserList = () => {
    const {data,isPending}=useQuerySearchUser()

   

    if(isPending){

      return <div>Loading..</div>
    }

    if(data?.length==0){

      return <DataNotFound title='This user Not Found'/>
    }
  return (
    <div className='mt-2'>
        {data?.map((item,index)=>(
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
