'use client'

import { DataNotFound } from '@/components/Chat/DataNotFound'
import { useStore } from '@/hooks/useStore'
import React from 'react'


export const SelectedUser = () => {
  
  const {selectedUser,setRemoveSelectedUser}=useStore()

  const removeUserFromSelectedList=(userId:string)=>{

     setRemoveSelectedUser(userId)

  }

  if(selectedUser.length==0){
    return <DataNotFound
          title='Selected User Not Found'
    />
  }
  return (
   
     <div className='mt-1 border-1 border-green-500 rounded-md p-2 flex gap-2 flex-wrap'>
      {selectedUser?.map((item,index)=>(
        <div 
         key={item?.userId+index}
        className='flex items-center gap-2 border-1 border-v-borderColor rounded-full px-2'>
           <p>{item?.userName}</p>
           <span 
            onClick={()=>removeUserFromSelectedList(item?.userId)}
            className='bg-red-500 p-1 hover:bg-red-600 hover:text-white cursor-pointer'>x</span>
        </div>
      ))}
     </div>
   
  )
}
