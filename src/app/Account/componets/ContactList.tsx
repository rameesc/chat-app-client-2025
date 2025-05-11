'use client'

import React from 'react'


import {  UserData } from '@/type/type';
import { UserSkeltone } from '@/components/Skeltone/userSkeltone';
import { UserAvatar } from '@/components/Chat/UserAvatar';
import { UserNameOrGroupName } from '@/components/Chat/UserNameOrGroupName';
import { DataNotFound } from '@/components/Chat/DataNotFound';

type ContactListProps={
  pending:boolean
  contacts:UserData[] |undefined
}
export const ContactList = ({pending,contacts}:ContactListProps) => {
    
  

    if(pending){
      return <div>
          <UserSkeltone/>
      </div>
    }
    if(contacts &&contacts?.length == 0){

      return <DataNotFound
             title='Data Not Found!'
            />
    }
  return (

  <div className='flex flex-col gap-2 mt-5'>
    {contacts?.map((user,index)=>(
      <div 
       className='flex gap-2'
       key={index+user?._id}
      >
        <UserAvatar 
         image={user?.picture}
        />
        <UserNameOrGroupName
          name={user?.userName}
        />
      </div>

    ))}
  </div>
    

  )
}
