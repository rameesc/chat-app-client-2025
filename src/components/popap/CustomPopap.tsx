'use client'



import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

type CustomPopapProps={
    children:React.ReactNode
    closeHandler:()=>void
    open:boolean
}
export const CustomPopap = ({children,closeHandler,open}:CustomPopapProps) => {

   
    const closePopap=useRef<HTMLDivElement>(null)

    const closeOutSideClickHandler=(e:MouseEvent)=>{

        if(closePopap.current && !closePopap.current.contains(e.target as Node)){
            closeHandler()
        }

        
       

    }

    useEffect(()=>{
    
        document.addEventListener("mousedown",closeOutSideClickHandler)

        return ()=>{
            document.removeEventListener("mousedown",closeOutSideClickHandler)
        }

    },[open,closeOutSideClickHandler])

  return (
    <div className={clsx('w-full h-full bg-[#20121298] z-10 fixed top-0 left-0 flex justify-center items-center',
      
    )}>

        <div 
          className='absolute top-[30%] left-[50%] translate-[-50%] w-full  flex justify-center items-center '
          ref={closePopap}>
          {children}
        </div>
    </div>
  )
}
