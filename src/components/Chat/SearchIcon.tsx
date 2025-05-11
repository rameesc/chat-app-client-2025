'use client'

import { useStore } from '@/hooks/useStore';
import React from 'react'
import { IoSearch } from "react-icons/io5";
export const SearchIcon = () => {

  const {setSearchBar,openSearchBar}=useStore()

  const openSearchBarHandler=()=>{
    setSearchBar(!openSearchBar)
  }
  return (
    <IoSearch
      onClick={openSearchBarHandler}
      size={25}
      className='text-v-grayText cursor-pointer'
    />
  )
}
