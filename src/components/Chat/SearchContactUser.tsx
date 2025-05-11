'use client'

import React from 'react'
import { ChatItemCard } from './ChatItemCard'

import { SearchUser } from './SearchUser'

import { useStore } from '@/hooks/useStore'

import { BackButton } from '../Button/BackButton'
import { useQuerySearchUser } from '@/hooks/useQueryUser'

import { SearchContactUserLoading } from '../Skeltone/SearchContactUserLoading'
import { SearchAccountUser } from './SearchAccountUser'
import { DataNotFound } from './DataNotFound'
import { usePathname } from 'next/navigation'




export const SearchContactUser = () => {
    const pathName=usePathname()
  
    const {setSearchBar}=useStore()

    const backToChatHandler=()=>{
        setSearchBar(false)

    }


    const {data,isPending}=useQuerySearchUser()

   

    if(isPending){

      return <SearchContactUserLoading/>
    }


   
  return (
    <div  className='bg-white w-[100%] md:w-[400px] rounded-md  h-full  overflow-y-scroll   p-5 '>
          <BackButton
           back={backToChatHandler}
          />
         <SearchUser
           pathName={pathName}
         />
           
        <ChatItemCard
          title='Search List'
        >
            
            {data && data?.length > 0 ?(
              <div className='flex flex-col    gap-4  '>

               {data?.map((user)=>(
                
                <SearchAccountUser
                  key={user?._id}
                  userId={user?._id}
                  image={user?.picture}
                  name={user?.userName}
               
                />

               ))}
                
               
              
                
             </div>
         ):(
          <DataNotFound
            title='User Date Not Found'
          />
         )} 

        </ChatItemCard>
       
        
    </div>
  )
}
