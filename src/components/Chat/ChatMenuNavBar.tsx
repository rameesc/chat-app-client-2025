'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const ChatMenuNavBar = () => {
    const [currentItem,setCureentItem]=useState('All')
    const router=useRouter()
    const navBarItem=[
        'All',
        'Person',
        "Group"
    ]

    const selectCategory=(value:string)=>{
      router.push(`/?category=${value}`)
      setCureentItem(value)

    }
  return (
    <div className='flex justify-between bg-[#e2d7d763] rounded-lg mt-5 p-2'>
        {navBarItem.map((item,index)=>(
            <span 
             onClick={()=>selectCategory(item)}
             className={clsx(' cursor-pointer',
                currentItem==item ? 'bg-white px-5 text-blue-500 rounded-3xl':'text-v-grayText px-5'

             )} 
             key={item+index}>{item}</span>
        ))}

    </div>
  )
}
