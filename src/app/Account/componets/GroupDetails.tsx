'use client'

import { BackButton } from '@/components/Button/BackButton'
import { DataNotFound } from '@/components/Chat/DataNotFound'
import { ProfialImage } from '@/components/Chat/ProfialImage'
import { UserAccountSkeltone } from '@/components/Skeltone/UserAccountSkeltone'

import { useQuerSingleConversation } from '@/hooks/useQueryConversation'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { UserDataItem } from './UserDataItem'
import { dateFormatted } from '@/helper/dateFormatted'

import { ExitFromGroup } from './ExitFromGroup'
import { GroupMembers } from './GroupMembers'
import { useUserInformation } from '@/hooks/useUserInformation'
import { RemoveGroup } from './RemoveGroup'
import { isAdminOrNot, isBucketImageOrNot } from '@/helper'
import { AddToNewUser } from './AddToNewUser'
import { CustomPopap } from '@/components/popap/CustomPopap'
import { SelectGroupMembers } from './SelectGroupMembers'
import { images } from '@/components/images'


export const GroupDetails = () => {

    const router=useRouter()

    const {data,isPending}=useQuerSingleConversation()

    const authData = useUserInformation()

    const [openAddUser,setOpenAddUser]=useState(false)

    const authUserId = authData?.user?.id as string

   

  

  
  
    
  

  
    const userArray=useMemo(()=>{
      
      if(!data) return
      const array=data?.participants

     const index= array?.map((user)=>user?._id).indexOf(authUserId)

     if(index > -1){
       const element= array.splice(index,1)[0]
       array.unshift(element)
     }

     return array

     

    },[authUserId,data])

    const gobackHandler=()=>{

      router.push('/')

    }

    //close

    const closeAddMemdersPopapHandler=()=>{

      setOpenAddUser(false)
    }

    if(authData?.status=='loading'||isPending){
      return <UserAccountSkeltone/>
  
    }

    if(!data?._id){
  
      return <DataNotFound
         title='Data Not Found..'
      />
     }
    
    
  return (
  <div className=' w-[100%] border-0 lg:border-1 bg-white border-v-borderColor rounded-md flex flex-col  lg:w-[500px] gap-2'>
    <div className=' w-[100%] p-1   lg:p-5 rounded-md flex flex-col  lg:w-[500px] gap-2'>

        <div className=''>
          <BackButton
           back={gobackHandler}
         />
        </div>

        <div className='flex flex-col items-center gap-1 '>
        
         <div 
            
          >
           
           <ProfialImage
          
           image={data?.groupPicture? isBucketImageOrNot(data?.groupPicture as string): images?.user }
           style='w-[150px] h-[150px] rounded-full cursor-pointer hover:scale-[0.9] hover:border-green-400 hover:border-2'
           />
          
         </div>
          <p className='text-v-grayText font-bold text-[20px]'>{data?.groupName}</p>

           
        </div>

        <div className='mt-10'>
            <UserDataItem
             label='Created At'
              value={data?.createdAt as string && dateFormatted(data?.createdAt as string) }
            />
        </div>
       
        <div className='flex flex-col gap-3  w-full'>
          <div className=' flex  justify-between  '>
            <p className=' font-[500] text-v-grayText text-[17px]'>{'Group Members'}</p>
            <p className='font-[500] text-v-grayText text-[17px]'>{data?.participants?.length}</p>
          </div>
            {userArray && userArray?.map((user)=>(
              <GroupMembers
               key={user?._id}
               userId={user?._id}
               userName={user?.userName}
               image={user?.picture}
               groupAdmin={data?.groupAdmin}
              />
               
            ))}
        </div>

        
    </div>
    <div className='p-2'>
     <ExitFromGroup/>
     {isAdminOrNot(data?.groupAdmin ,authUserId) &&(
       <RemoveGroup/>
     )}
     {isAdminOrNot(data?.groupAdmin ,authUserId) &&(
       <AddToNewUser
         openPopap={()=>setOpenAddUser(true)}
       />
     )}
     

    </div>

    {openAddUser && (

      <CustomPopap
        open={openAddUser}
        closeHandler={closeAddMemdersPopapHandler}
        >
          
            <SelectGroupMembers
              closeMembersPopap={closeAddMemdersPopapHandler}
            />
          
      </CustomPopap>

    )}
   
    
  </div>
  )
}
