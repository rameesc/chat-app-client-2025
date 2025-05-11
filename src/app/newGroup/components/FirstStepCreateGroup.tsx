'use client'

import React from 'react'
import { SelectedUser } from './SelectedUser'
import { UserContactUser } from './UserContactUser'
import { SearchUser } from '@/components/Chat/SearchUser'
import { GroupCart } from './GroupCart'
import { ChatSearchUserList } from './ChatSearchUserList'
import { GroupNextButtom } from './GroupNextButtom'
import { BackButton } from '@/components/Button/BackButton'
import { useParams, usePathname, useRouter } from 'next/navigation'

export const FirstStepCreateGroup = () => {

    const pathName=usePathname()
    const parms=useParams()
    const router=useRouter()
    const backHandler=()=>{
        router.back()
    }
  return (
    <div className='flex flex-col  gap-2'>
        <div className='flex gap-2 items-center'>
         <BackButton
          back={backHandler}

         />
         <div>
            <p className=' font-bold text-[18px]'>Add Group Members</p>
         </div>

        </div>

       
        <GroupCart
          title='Selected members'
         >
           <SelectedUser/>

        </GroupCart>

        <GroupCart
          title='Search User'
         >
          <SearchUser 
           pathName={pathName}
          />
          <ChatSearchUserList/>

        </GroupCart>

        <GroupCart
          title='Your Contact list'
         >
          {parms?.userId}
          <UserContactUser
           userId={parms?.userId as string}
          />

        </GroupCart>

        <div className=' self-center mt-[30px] '>
            <GroupNextButtom/>
        </div>
        
    </div>
  )
}
