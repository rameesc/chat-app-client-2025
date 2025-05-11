'use client'

import { ProfialImage } from '@/components/Chat/ProfialImage'

import { Button } from '@/components/ui/button'
import { dateFormatted } from '@/helper/dateFormatted'
import { useQueryAuthUserData, useQueryUserBlockList, useQueryUserContactList, useQueryUserData } from '@/hooks/useQueryUser'

import React, { useState } from 'react'
import { UserDataItem } from './UserDataItem'
import { BackButton } from '@/components/Button/BackButton'
import { useParams, useRouter } from 'next/navigation'
import { ClientLogoutButton } from '@/components/Button/ClientLogoutButton'

import { isBucketImageOrNot, itMeUser } from '@/helper'
import { CustomPopap } from '@/components/popap/CustomPopap'
import { useStore } from '@/hooks/useStore'

import { ShowImage } from './ShowImage'
import clsx from 'clsx'
import { UploadImageFrom } from './UploadImageFrom'
import { UserAccountSkeltone } from '@/components/Skeltone/UserAccountSkeltone'
import { DataNotFound } from '@/components/Chat/DataNotFound'
import { ContactList } from './ContactList'
import { DropDownMenu } from './DropDownMenu'
import { AccounBlockUpblockBtn } from '@/components/Button/AccounBlockUpblockBtn'
import { AddToContact } from './AddToContact'



export const AccountDetails = ()=> {
   
     const router=useRouter()
     const params=useParams()

    const {isPending,data}=useQueryUserData()
    const {showPopap,setShowPopap,uploadProfile,setUploadProfile}=useStore()
    const [openConcat,setOpenContact]=useState(false)
    const [openBlock,setOpenBlock]=useState(false)
    
 

    const {data:contactData,refetch,isPending:contcatPending}=useQueryUserContactList(params?.userId as string)
    const {data:blockData,refetch:refetchBlock,isPending:blockPending}=useQueryUserBlockList()
    const {data:userData,isPending:userDataPending}=useQueryUserData()
    const {data:authUser}=useQueryAuthUserData()

    

   
   const gobackHandler=()=>{
      router.back()

   }

   const opneImageHandler=()=>{
   
     setShowPopap(true)
   }

   const uploadImageHandler=()=>{

    setUploadProfile(true)
   }

   const openContcatList=()=>{
      refetch()
      setOpenContact(!openConcat)
     
      
   }
   const openBlockList=()=>{
     refetchBlock()
     setOpenBlock(!openBlock)
     
      
   }

   if(isPending||userDataPending){
    return <UserAccountSkeltone/>
   }

   if(!userData?._id){

    return <DataNotFound
       title='Data Not Found..'
    />
   }

  return (
    <div className=' w-[100%] border-1 bg-white border-v-borderColor rounded-md p-5 flex flex-col  lg:w-[500px] gap-2'>

      <div className=''>
          <BackButton
           back={gobackHandler}
         />
      </div>
         
      <div className='flex flex-col items-center gap-1'>
        
         <div 
           onClick={()=>opneImageHandler()}
          >
           
          <ProfialImage
          
           image={isBucketImageOrNot(userData?.picture)}
           style='w-[150px] h-[150px] rounded-full cursor-pointer hover:scale-[0.9] hover:border-green-400 hover:border-2'
          />
         
          
         </div>

         <div>
          {itMeUser(authUser?._id as string, data?._id as string) &&(
            <Button 
             onClick={()=>uploadImageHandler()}
             className=' cursor-pointer'>Update Profil</Button>

          )}
         </div>

         <p className='text-v-grayText font-bold'>{userData?.userName}</p>
         <p className='text-v-grayText'>{userData?.email}</p>
        
      </div>
      
      <UserDataItem
        label='Join by'
        value={userData?.createdAt as string && dateFormatted(userData?.createdAt as string) }
      />
      <UserDataItem
        label='Login With'
        value={userData?.loginSystem as string }
      />

      {/* account block button */}
      {!itMeUser(authUser?._id as string,data?._id as string) && (
         <AccounBlockUpblockBtn/>

      )}

      {/* add to contact */}
      {!itMeUser(authUser?._id as string,data?._id as string) && (
         <AddToContact/>

      )}
     

      {itMeUser(authUser?._id as string,data?._id as string) &&(
        <DropDownMenu
        menuTitle='Contact List'
        closeMenuOpenMenu={openContcatList}
        opne={openConcat}
       >
        <ContactList 
          pending={contcatPending}
          contacts={contactData?.contact?.contacts}
         />
       </DropDownMenu>

      )}
     
     {itMeUser(authUser?._id as string,data?._id as string) && (
      <DropDownMenu
      menuTitle='Block List'
      closeMenuOpenMenu={openBlockList}
      opne={openBlock}
      >
      <ContactList 
        pending={blockPending}
        contacts={blockData?.contact?.blockedUser}
       />
     </DropDownMenu>

     )}
     

     { 
      itMeUser(authUser?._id as string,data?._id as string) &&
       <ClientLogoutButton/>
      }

      

   
      <div className={clsx('',
        showPopap? "visible":"invisible"
      )}>

   
       <CustomPopap
          closeHandler={()=>setShowPopap(false)}
          open={showPopap}
       >
         <ShowImage 
           image={userData?.picture}
           style='w-[200px] h-[200px] object-cover'
         />
       </CustomPopap>
      </div>

      <div className={clsx('',
        uploadProfile? "visible":"invisible"
      )}>

   
       <CustomPopap
        closeHandler={()=>setUploadProfile(false)}
        open={uploadProfile}
       >
         <UploadImageFrom
          email={data?.email}
           maxSizeMB={2}
         />
       </CustomPopap>
      </div>
     
      
    </div>
  )
}
