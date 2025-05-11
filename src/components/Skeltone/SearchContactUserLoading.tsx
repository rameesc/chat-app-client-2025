'use client'

import React from 'react'
import { BackButton } from '../Button/BackButton'
import { SearchUser } from '../Chat/SearchUser'
import { UserSkeltone } from './userSkeltone'
import { useStore } from '@/hooks/useStore'

export const SearchContactUserLoading = () => {
    const {setSearchBar}=useStore()

    const backToChatHandler=()=>{
        setSearchBar(false)

    }
  return (
    <div className='flex flex-col  pt-5 p-2 gap-2 bg-white'>
        <div className=''>
            
         <BackButton
          back={backToChatHandler}
            
         />
        </div>
               
        <SearchUser/>
        <UserSkeltone/>
        <UserSkeltone/>
        <UserSkeltone/>
        <UserSkeltone/>

     </div> 
  )
}
