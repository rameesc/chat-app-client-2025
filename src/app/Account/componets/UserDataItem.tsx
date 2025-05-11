'use client'


import React from 'react'

type UserDataItemType={
    label:string
    value:string
}
export const UserDataItem = ({label,value}:UserDataItemType) => {
  return (
    <div>
         <p>{label}</p>
          <p className='text-v-grayText text-[15px]'>{value}</p>
      </div>
  )
}
