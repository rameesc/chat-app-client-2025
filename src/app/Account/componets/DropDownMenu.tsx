'use client'

import clsx from 'clsx'
import React from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

type DropDownMenuProp={
    opne:boolean,
    closeMenuOpenMenu:()=>void,
    menuTitle:string,
    children:React.ReactNode
}
export const DropDownMenu = ({opne,closeMenuOpenMenu,menuTitle,children}:DropDownMenuProp) => {
  return (
    <div className='flex  flex-col  gap-2   border-1 border-v-grayText p-2  cursor-pointer'>
       
        <div onClick={closeMenuOpenMenu} className='flex gap-2 items-center'>
          <p className='font-bold'>{menuTitle}</p>
          <div>
           {opne ?    <FaAngleUp/>:<FaAngleDown/> } 
           
           </div>

        </div>
        
        <div className={clsx('',
            opne ? 'visible h-full duration-500 ease-out transition-all':"invisible h-[2px] duration-200 ease-in-out "
        )}>
           {children}
        </div>
        
    </div>
  )
}
